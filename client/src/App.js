import {Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
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
import UnhandledError from './components/UnhandledError';
import PrivateRoute from './components/PrivateRoute';
import React from 'react';

function App() {
  return (
    //routes for SPA
    <ResultProvider>
        <div>             
              <Routes>
                <Route path='/' element={ <Courses />} />
        
                  <PrivateRoute path='courses/create' element={<CreateCourse />} />
                  <Route path='courses/:id' element={ <CourseDetail />} />
                  <React.Fragment>
                  <PrivateRoute path='courses/:id/update' element={<UpdateCourse />} />
                  </React.Fragment>
                  <Route path='signin' element={ <UserSignIn />} />
                  <Route path='signup' element={ <UserSignUp />} />
                  <Route path='signout' element={ <Navigate to={'/'} />} />
                  <Route path='error' element={<UnhandledError />} />
                <Route path="*" element={ <NotFound />} />
              </Routes>
        </div>
    </ResultProvider>
  );
}

export default App;
