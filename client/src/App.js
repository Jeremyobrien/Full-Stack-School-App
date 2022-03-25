import {Routes, Route } from 'react-router-dom'
import { ResultProvider } from './components/Context';
// import './App.css';
import Courses from './components/Courses';

function App() {
  return (
    //routes for SPA
    <ResultProvider>
        <div>             

              <Routes>
                <Route path='/' element={ <Courses /> } >
                  {/* <Route path='search/:query' element={} />
                  <Route path='kitties' element={  } />
                  <Route path='puppies' element={  } />
                  <Route path='iguanas' element={  } /> */}
                </Route>
                {/* <Route path="*" element={ <NotFound />} /> */}
            </Routes>
        </div>
    </ResultProvider>
  );
}

export default App;
