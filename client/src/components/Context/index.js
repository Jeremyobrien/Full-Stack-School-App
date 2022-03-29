import React, {
    useContext,
    useEffect,
    useState
}from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
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
  const [course, setCourse] = useState([]);
  const { id } = useParams;

  useEffect( ()=> {
        const getCourses = async () => {
        const response = await axios.get('http://localhost:5000/api/courses')
        setList(response.data);
      };
      getCourses();

  }, []);

    useEffect( ()=> {

        if (query !== ''){
            const getCourse = async () => {
                const response = await axios.get(`http://localhost:5000/api/courses/${query}`)
                await setCourse(response.data);
              };
              getCourse();
        }

    }, [query]);


    useEffect( ()=> { 
        const urlParam = location.pathname.replace('/courses/', '').replace('/', '').replace('update', '');
        urlParam === '' ? setQuery('') : setQuery(urlParam);
    }, [location, query]);


    
    return (
        <ResultContext.Provider value={{ list, query, course, id }}>       
            <ResultUpdateContext.Provider value={{setQuery}}>
                {children}
            </ResultUpdateContext.Provider>
        </ResultContext.Provider>
    );
}