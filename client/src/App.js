import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './App.css';

function App() {
  const [list, setList] = useState([]);

  useEffect( ()=> {
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => { setList(response.data)})
      .catch(error => { console.log('Error fetching and parsing data', error)})
  }, []);


  return (
    <div className="App">
      <ul>
      {
        list.map( course => 
        <li key={list.indexOf(course)}>{course.title}</li>
        )
      }
      </ul>

    </div>
  );
}

export default App;
