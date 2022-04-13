import React, {
    useContext,
    useEffect,
    useState
}from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import { Buffer } from 'buffer';
import config from './config';
//create context for variables and functions
const ResultContext = React.createContext();
const ResultUpdateContext = React.createContext();

//allow components to access up-to-date context
export function useData() {
    return useContext(ResultContext)
}
export function useUpdateData() {
    return useContext(ResultUpdateContext)
}

//maintains state of app
export function ResultProvider({ children }) {
  

  const [ list, setList ] = useState([]);
  const [ user, setUser ] = useState(null);
  const [course, setCourse] = useState();
  const [error, setError] = useState(null);
  const { id } = useParams;
  const navigate = useNavigate();


//brings in list of courses on render
  useEffect( ()=> {   
      getCourses();
  }, []);

//fetches list of courses from api
  const getCourses = async () => {
     await axios.get('http://localhost:5000/api/courses')
                .then( res => setList(res.data))
                .catch( err => {
                  console.log(err.message)
                  setError( err.message )
                });                           
  };

//function that completes fetch requests and creates auth headers
  const api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null ) => {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
        const encodedCredentials = Buffer.from(`${credentials.emailAddress}:${credentials.password}`).toString('base64')
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

//helper function to get specific user
  const getUser = async (emailAddress, password) => {
    const response = await api(`/users`, 'GET', null, true, { emailAddress, password } );
              if (response.status === 200) {
                return response.json().then(data => data);
              }
              else if (response.status === 401) {
                throw new Error("Unable to access user's data")
              }
              else {
                throw new Error();
              }
  }

  //signs in and stores active user's data
  const signIn = async (emailAddress, password) => {
    const user =  await getUser(emailAddress, password);
    if ( user !== null ) {
        user.password = password
        setUser(user)
    } else {
        return;
    }
}

//signs out user
const   signOut = () => {
    setUser(null);
}

//Creates new user and signs them in with their credentials
const createUser = async (user) => {
 const response = await api('/users', 'POST', user);
        if (response.status === 201) {
            setUser(user);
            signIn(user.emailAddress, user.password)
            navigate('/')
        } else if (response.status === 400) {   
            return response.json().then( data => {
                  return data;
            })
      } else {
            throw new Error();
      }
}

//sets new course
    const handleCourseUpdate = (res) => {
              return setCourse(res)
      }

//deletes selected course
    const handleDelete = async (courseId, emailAddress, password) => {
        await api(`/courses/${courseId}`, 'DELETE', {}, true, { emailAddress, password } )
        await getCourses();
        navigate('/');
    }

//creates new course
    const handleCreate = async (newCourse, emailAddress, password) => {
      const response =  await api(`/courses`, 'POST', newCourse, true, { emailAddress, password } );
        if(response.status === 201) { 
          getCourses();
          navigate('/');
          return []; 

        } else if (response.status === 400) {
          return response.json().then(data => {
            return data;
          });

        } else {
          throw new Error();
        }
    }

//updates existing course
    const handleUpdate = async (updatedCourse, emailAddress, password) => {
      const response =  await api(`/courses/${updatedCourse.id}`, 'PUT', updatedCourse, true, { emailAddress, password } )
              if(response.status === 204) {
                getCourses();
                navigate('/');
                return []; 
                
              } else if (response.status === 400) {
                return response.json().then(data => {
                  return data;
                });
              } else {
                throw new Error();
              }
    }

//Global providers 
    return (
        <ResultContext.Provider value={{ list, id, user, course, error }}>       
            <ResultUpdateContext.Provider value={{ 
              api, createUser, signIn, handleDelete, 
              handleCreate, handleUpdate, handleCourseUpdate, 
              signOut, setError }}>
                {children}
            </ResultUpdateContext.Provider>
        </ResultContext.Provider>
    );
}