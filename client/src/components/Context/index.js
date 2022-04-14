import React, {
    useContext,
    useEffect,
    useState
}from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
// import Cookies from 'js-cookie';
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
  
  //state
  const [ list, setList ] = useState([]);
  const [ user, setUser ] = useState(null);
  const [course, setCourse] = useState();
  const { id } = useParams;
  const navigate = useNavigate();


  /* EXAMPLE OF CREATING GLOBAL COOKIE STATE WITH JS-COOKIE V^3.01 
  SEE 'signin' FUNCTION FURTHER DOWN FOR INITIALIZATION */
  // const [authUser, setAuthUser] = useState([])
  // const cookieE = Cookies.get('authEmail')
  // const cookieP = Cookies.get('authPassword')
  // const cookieFN = Cookies.get('authFirstName')
  // const cookieLN = Cookies.get('authLastName')
  // const cookieId = Cookies.get('authUserId')
  // //Create Cookie state
  // useEffect( () => {
  //   setAuthUser([cookieE, cookieFN, cookieId, cookieLN, cookieP])
  // },[cookieE, cookieFN, cookieId, cookieLN, cookieP]);

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
                  navigate('/errors')
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
                navigate('/error');
                throw new Error();
              }
  }

  //signs in and stores active user's data
  const signIn = async (emailAddress, password) => {
    const user =  await getUser(emailAddress, password);
    if ( user !== null ) {
        user.password = password
        setUser(user)
        // /*EXAMPLE OF INITIALIZING COOKIES WITH JS-COOKIE V^3.01*/
        // Cookies.set('authEmail', JSON.stringify(user.emailAddress), { expires: 1});
        // Cookies.set('authPassword', JSON.stringify(user.password), {expires: 1});
        // Cookies.set('authFirstName', JSON.stringify(user.firstName), {expires: 1});
        // Cookies.set('authLastName', JSON.stringify(user.lastName), {expires: 1});
        // Cookies.set('authUserId', JSON.parse(user.id), {expires: 1});
    } else {
        return;
    }
}

//signs out user
const signOut = () => {
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
            navigate('/error');
            throw new Error();
      }
}

//sets new course
    const handleCourseUpdate = (res) => {
              return setCourse(res)
      }

//deletes selected course
    const handleDelete = async (courseId, emailAddress, password) => {
        try {
          await api(`/courses/${courseId}`, 'DELETE', {}, true, { emailAddress, password } )
          await getCourses();
          navigate('/');
         } catch(err) {
           return navigate('/error')
         }

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
          navigate('/error')
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
                navigate('/error')
                throw new Error();
              }
    }

//Global providers 
    return (
        <ResultContext.Provider value={{ list, id, user, course}}>       
            <ResultUpdateContext.Provider value={{ 
              createUser, signIn, handleDelete, 
              handleCreate, handleUpdate, handleCourseUpdate, 
              signOut}}>
                {children}
            </ResultUpdateContext.Provider>
        </ResultContext.Provider>
    );
}