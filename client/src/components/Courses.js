
import React, { useData } from './Context';
import { NavLink, Routes, Route, Outlet } from 'react-router-dom';
import Header from './Header';
import CourseDetail from './CourseDetail';
import UpdateCourse from './UpdateCourse';
import CreateCourse from './CreateCourse';
import CourseList from './CourseList';
const Courses = () => {
    
    const { list } = useData();

    return (
        <div>
            <Routes>
                <Route index element={<CourseList />}/>
                <Route path='create' element={<CreateCourse />} />
                <Route path=':id/*' element={<CourseDetail />} />
            </Routes>

            <Outlet />
        </div>

    );

}

export default Courses;