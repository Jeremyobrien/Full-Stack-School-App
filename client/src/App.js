import {Routes, Route } from 'react-router-dom'
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
import CourseList from './components/CourseList';

function App() {
  return (
    //routes for SPA
    <ResultProvider>
        <div>             
              <Routes>
                <Route path='/' element={ <CourseList />} />
                  <Route path='courses/*' element={ <Courses /> } />
                  <Route path='signin' element={ <UserSignIn />} />
                  <Route path='signup' element={ <UserSignUp />} />
                  <Route pahth='signout' element={ <UserSignOut />} />
                <Route path="*" element={ <NotFound />} />
              </Routes>
        </div>
    </ResultProvider>
  );
}

export default App;
