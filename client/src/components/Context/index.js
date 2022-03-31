import React, {
    useContext,
    useEffect,
    useState
}from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

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
  
//   const [isLoading, setIsLoading] = useState(true);
//   const location = useLocation();

  const [list, setList] = useState([]);
  const [query, setQuery ] = useState('');
  const location = useLocation();
//   const [course, setCourse] = useState([]);
  const { id } = useParams;
  const navigate = useNavigate();
  
  useEffect( ()=> {
        const getCourses = async () => {
        const response = await axios.get('http://localhost:5000/api/courses')
        setList(response.data);
      };
      getCourses();

  }, []);

    // useEffect( ()=> {

    //     if (query !== '' ){
    //         const getCourse = async () => {
    //             const response = await axios.get(`http://localhost:5000/api/courses/${query}`)
    //             await setCourse(response.data);
    //           };
    //           getCourse();
    //     }

    // }, [query]);


    // useEffect( ()=> { 
    //     const urlParam = location.pathname.replace('/courses/', '').replace('/', '').replace('update', '');
    //     urlParam === '' ? setQuery('') : setQuery(urlParam);
    // }, [location, query]);

    // useEffect( ()=> { 
    //     const urlParam = location.pathname
    //     if(urlParam.includes('update')){
    //         handleCourseSelect(id)
    //     }

    // }, [location, id]);

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
        <ResultContext.Provider value={{ list, query, id }}>       
            <ResultUpdateContext.Provider value={{setQuery, handleDelete, handleCreate, handleUpdate }}>
                {children}
            </ResultUpdateContext.Provider>
        </ResultContext.Provider>
    );
}