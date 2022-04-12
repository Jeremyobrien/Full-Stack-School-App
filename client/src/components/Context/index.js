import React, {
    useContext,
    useEffect,
    useState
}from 'react';
import axios from 'axios';
import { Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
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


  useEffect( ()=> {   
      getCourses();
  }, []);

   // .then( res => {
                                //   if(res.status !== 200) {
                                //     throw Error('failed to fetch courses');
                                //   } else {
                                //     return setList(res.data);
                                //   }
                                // })
                                // .catch( err => setError(err.message));

  const getCourses = async () => {
     await axios.get('http://localhost:5000/api/courses')
                .then( res => setList(res.data))
                .catch( err => {
                  console.log(err.message)
                  setError( err.message )
                });                           
  };

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
  
  const signIn = async (emailAddress, password) => {
    const user =  await getUser(emailAddress, password);
    if ( user !== null ) {
        user.password = password
        setUser(user)
    } else {
        return;
    }
}

const   signOut = () => {
    setUser(null);
}

const createUser = async (user) => {
 await api('/users', 'POST', user)
        .then( res => {
         if (res.status === 400) {   
              throw new Error('Insufficient information provided to create an account')
          } else if (res.status === 201) {
              setUser(user);
              signIn(user.emailAddress, user.password)
              navigate('/') }
              else {
                    throw new Error();
                  }
                })
            .catch( err => setError(err.message));
            console.log(error)
}

    const handleCourseUpdate = (res) => {
              return setCourse(res)
      }

    const handleDelete = async (courseId, emailAddress, password) => {
        await api(`/courses/${courseId}`, 'DELETE', {}, true, { emailAddress, password } )
        await getCourses();
        navigate('/');
    }

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

    const handleUpdate = async (updatedCourse, emailAddress, password) => {
      const response =  await api(`/courses/${updatedCourse.id}`, 'PUT', updatedCourse, true, { emailAddress, password } )
              if(response.status === 204) {
                getCourses();
                navigate('/');
                return []; 
                
              } else if (response.status === 400) {
                return response.json().then(data => {
                  return data.errors;
                });
              } else {
                throw new Error();
              }
    }

    
    return (
        <ResultContext.Provider value={{ list, id, user, course, error }}>       
            <ResultUpdateContext.Provider value={{ api, createUser, signIn, handleDelete, handleCreate, handleUpdate, handleCourseUpdate, signOut, setError }}>
                {children}
            </ResultUpdateContext.Provider>
        </ResultContext.Provider>
    );


}