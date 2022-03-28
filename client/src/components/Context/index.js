import React, {
    useContext,
    useEffect,
    useState
}from 'react';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
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




//   useEffect( ()=> {
//     axios.get(`http://localhost:5000/api/courses/${query}`)
//     .then(response => { setCourse(response.data)})
//     .then( () => console.log(course))
//     .then( ()=> console.log(query))
//     .catch(error => { console.log('Error fetching and parsing data', error)})
//   }, [query]);

//   //api function
//    const fetchData = (queryString) => {
//         setIsLoading(true);
//         axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${queryString}&per_page=24&format=json&nojsoncallback=1`)
//             .then(response => { setPhotos(response.data.photos.photo)})
//             .catch(error => { console.log('Error fetching and parsing data', error)})
//             .finally( ()=> setIsLoading(false));
//         }

//     //loads initial photos
//     useEffect( ()=> {fetchData(query)}, [query]);

    //ensures url params match search results
    useEffect( ()=> { 
        const urlParam = location.pathname.replace('/courses/', '').replace('/', '');
        urlParam === '' ? setQuery('') : setQuery(urlParam);
    }, [location, query]);


    
    return (
        <ResultContext.Provider value={{ list, query, course }}>       
            <ResultUpdateContext.Provider value={{setQuery}}>
                {children}
            </ResultUpdateContext.Provider>
        </ResultContext.Provider>
    );
}