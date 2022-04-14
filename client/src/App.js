import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { ResultProvider } from './components/Context';
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
import Forbidden from './components/Forbidden';


function App() {
  return (
    //routes for SPA and Provider function wrapper
    <ResultProvider>
        <div>             
              <Routes>
                <Route path='/' element={ <Courses />} />
                  <Route path='courses/create' element={<PrivateRoute />} >
                    <Route index element={<CreateCourse />} />
                  </Route>
                  <Route path='courses/:id' index element={ <CourseDetail />} />
                  <Route path='courses/:id/update' element={<PrivateRoute />} >
                    <Route index element={<UpdateCourse />} />
                  </Route>
                  <Route path='signin' element={ <UserSignIn />} />
                  <Route path='signup' element={ <UserSignUp />} />
                  <Route path='signout' element={ <UserSignOut />} />
                  <Route path='error' element={<UnhandledError />} />
                  <Route path='notfound' element={<NotFound />} />
                  <Route path='forbidden' element={<Forbidden />} />
                <Route path="*" element={ <NotFound />} />
              </Routes>
        </div>
    </ResultProvider>
  );
}

export default App;
