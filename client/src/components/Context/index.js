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
  const { id } = useParams;
  const navigate = useNavigate();


  useEffect( ()=> {   
      getCourses();
  }, []);

  const getCourses = async () => {
    const response = await axios.get('http://localhost:5000/api/courses')
    setList(response.data);
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
      return null;
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
  const response = await api('/users', 'POST', user);
  if (response.status === 201) {
    setUser(user);
    await signIn(user.emailAddress, user.password)
    navigate('/')
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

const handleCourseUpdate = (res) => {
        return setCourse(res)
}

    const handleDelete = async (courseId, emailAddress, password) => {
        await api(`/courses/${courseId}`, 'DELETE', {}, true, { emailAddress, password } )
        await getCourses();
        navigate('/');
    }

    const handleCreate = async (newCourse, emailAddress, password) => {
        await api(`/courses`, 'POST', newCourse, true, { emailAddress, password } )
        await getCourses();
        navigate('/');
    }

    const handleUpdate = async (updatedCourse, emailAddress, password) => {
        await api(`/courses/${updatedCourse.id}`, 'PUT', updatedCourse, true, { emailAddress, password } )
        await getCourses();
        navigate('/');
    }

    
    return (
        <ResultContext.Provider value={{ list, id, user, course }}>       
            <ResultUpdateContext.Provider value={{ api, createUser, signIn, handleDelete, handleCreate, handleUpdate, handleCourseUpdate, signOut }}>
                {children}
            </ResultUpdateContext.Provider>
        </ResultContext.Provider>
    );


}