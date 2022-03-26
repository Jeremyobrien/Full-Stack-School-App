import {Routes, Route } from 'react-router-dom'
import { ResultProvider } from './components/Context';
// import './App.css';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';

function App() {
  return (
    //routes for SPA
    <ResultProvider>
        <div>             

              <Routes>
                <Route path='/' element={ <Courses /> } >
                  <Route path='/:id' element={ <CourseDetail /> } />
                  <Route path='/fuck' element={ <CreateCourse /> } />
                  {/* <Route path='search/:query' element={} />
                  <Route path='kitties' element={  } />
                  <Route path='puppies' element={  } />
                  <Route path='iguanas' element={  } /> */}
                </Route>
                {/* <Route path='/' element={<CreateCourse />} /> */}
                <Route path="*" element={ <NotFound />} />
            </Routes>
        </div>
    </ResultProvider>
  );
}

export default App;
