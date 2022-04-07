import React, {
    useContext,
    useEffect,
    useState
}from 'react';
import axios from 'axios';
import { Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import config from './config';
import { encode } from 'punycode';
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
  const [ query, setQuery ] = useState('');
  const [ user, setUser ] = useState(null);
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [ isDeleted, setIsDeleted ] = useState(false);

  useEffect( ()=> {
        const getCourses = async () => {
        const response = await axios.get('http://localhost:5000/api/courses')
        setList(response.data);
      };
      getCourses();

  }, []);

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

  const encodeAuth = (credentials) => {
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    const encodedCredentials = Buffer.from(`${credentials.emailAddress}:${credentials.password}`).toString('base64')
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;
  
    return options;
  }


  const getUser = async (emailAddress, password) => {
    const response = await api(`/users`, 'GET', null, true, { emailAddress, password } );
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  const createUser = async (user) => {
    const response = await api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  const signIn = async (emailAddress, password) => {
    const user =  await getUser(emailAddress, password);
    if ( user !== null ) {
        setUser(user)
    } else {
        return user;
    }
}

const signOut = () => {
    setUser(null);
}

const changeCourse = (newCourse) => {
  return setCourse(newCourse)
}

const handleCourseUpdate = async (changes, courseId) => {

  const { emailAddress, password } = user;
  const userId = user.id;
  const response = await api(`/courses/${courseId}`, 'PUT', {course:changes, id:userId}, true, {emailAddress, password });
  if (response.status === 201) {
    return [];
  }
  else if (response.status === 400) {
    return response.json().then(data => {
     return data;
    });
  }
  else {
    throw new Error();
  }
}

    const handleDelete = async (courseId) => {
        const credentials = {
          username: user.emailAddress,
          password: user.password
        }
        const encodedCredentials = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')
        const headers = {
          'Authorization': `Basic ${encodedCredentials}`
        }
        const res = await axios.delete(`http://localhost:5000/api/courses/${courseId}`, { headers })
                          .then( res => { setIsDeleted(true)})
                          .then( console.log(isDeleted))
        setList(res);
        navigate('/');
    }

    const handleCreate = async (newCourse) => {

      const { emailAddress, password, id } = user;

      // const encodedAuth = await encodeAuth(credentials);
      //   await axios.post('http://localhost:5000/api/courses/', { data:{newCourse}}, encodedAuth)
      //                           .catch(error => { console.log(`shit ${error.message}`)})
      //   navigate('/');
      const response = await api('/courses', 'POST', {course:newCourse, id:id}, true, {emailAddress, password });
      if (response.status === 201) {
        return [];
      }
      else if (response.status === 400) {
        return response.json().then(data => {
         return data;
        });
      }
      else {
        throw new Error();
      }
    }

    // const addToList = () => {
    //   const newList = await getCourses()
    // }

    // const handleUpdate = async (updatedCourse) => {
    //     const res = await axios.put(`http://localhost:5000/api/courses/${id}`, updatedCourse)
    //     setList(res)
    //     navigate('/')
    // }

    
    return (
        <ResultContext.Provider value={{ list, id, user, course }}>       
            <ResultUpdateContext.Provider value={{ api, createUser, signIn, handleDelete, handleCreate, changeCourse, signOut, handleCourseUpdate }}>
                {children}
            </ResultUpdateContext.Provider>
        </ResultContext.Provider>
    );


}