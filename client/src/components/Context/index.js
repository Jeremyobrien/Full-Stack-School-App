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
  const [ query, setQuery ] = useState('');
  const [ user, setUser ] = useState({});
  const { id } = useParams;
  const navigate = useNavigate();



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

const   signOut = () => {

}


    const handleDelete = async (courseId) => {
        const res = await axios.delete(`http://localhost:5000/api/courses/${courseId}`)
        setList(res);
        navigate('/');
    }

    const handleCreate = async (newCourse) => {
        const res = await axios.post('http://localhost:5000/api/courses/', newCourse )
        setList(res)
        navigate('/')
    }

    const handleUpdate = async (updatedCourse) => {
        const res = await axios.put(`http://localhost:5000/api/courses/${id}`, updatedCourse)
        setList(res)
        navigate('/')
    }

    
    return (
        <ResultContext.Provider value={{ list, id, user }}>       
            <ResultUpdateContext.Provider value={{ api, createUser, signIn, handleDelete, handleCreate, handleUpdate }}>
                {children}
            </ResultUpdateContext.Provider>
        </ResultContext.Provider>
    );


}