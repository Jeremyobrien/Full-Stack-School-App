import React, {
    useContext,
    useEffect,
    useState
}from 'react';
import axios from 'axios';
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

  useEffect( ()=> {
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => { setList(response.data)})
      .catch(error => { console.log('Error fetching and parsing data', error)})
  }, []);
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

//     //ensures url params match search results
//     useEffect( ()=> { 
//         const searchTerm = location.pathname.replace('/search/', '').replace('/', '');
//         searchTerm === '' ? setQuery(query) : setQuery(searchTerm);
//     }, [location, query]);

    return (
        <ResultContext.Provider value={{ list }}>       
            <ResultUpdateContext.Provider value={{}}>
                {children}
            </ResultUpdateContext.Provider>
        </ResultContext.Provider>
    );
}