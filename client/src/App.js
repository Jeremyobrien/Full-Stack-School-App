import {Routes, Route, Navigate } from 'react-router-dom'
import { ResultProvider } from './components/Context';
// import './App.css';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';


function App() {
  return (
    //routes for SPA
    <ResultProvider>
        <div>             
              <Routes>
                <Route path='/' element={ <Courses />} />
                  <Route path='courses/create' element={<CreateCourse />} />
                  <Route path='courses/:id' element={ <CourseDetail />} />
                  <Route path='courses/:id/update' element={<UpdateCourse />} />
                  <Route path='signin' element={ <UserSignIn />} />
                  <Route path='signup' element={ <UserSignUp />} />
                  <Route path='signout' element={ <Navigate to={'/'} />} />
                <Route path="*" element={ <NotFound />} />
              </Routes>
        </div>
    </ResultProvider>
  );
}

export default App;
