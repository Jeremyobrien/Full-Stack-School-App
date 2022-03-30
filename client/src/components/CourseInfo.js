
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams, useLocation, Route, Routes } from 'react-router-dom';
import { useData, useUpdateData } from './Context';
import axios from 'axios';
import Header from './Header';
import ReactMarkdown from 'react-markdown';
import NotFound from './NotFound';
import UpdateCourse from './UpdateCourse';
import CourseDetail from './CourseDetail';

const CourseInfo = () => {
    const {query } = useData();
    const {handleDelete} = useUpdateData();
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const location = useLocation();
    
    useEffect( ()=> {

            const getCourse = async () => {
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`)
                await setCourse(response.data);
                setIsLoading(false);
              };
              getCourse();


    }, []);

return (
    isLoading ?
    <h2>Loading...</h2>
    :
        <div id="root">
        <Header />
        <main>
            <div className="actions--bar">
            <div className="wrap">
                <NavLink to={`update`}><button className="button">Update Course</button></NavLink>
                <button className="button" onClick={() => handleDelete(course.id)}>Delete Course</button>
                <NavLink to={"/"}><button className="button button-secondary">Return to List</button></NavLink>
            </div>
            </div>
            <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p>By {course.userInfo.firstName} {course.userInfo.lastName}</p>
                    <p>{course.description}</p>
                </div>
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ReactMarkdown className='course-detail--list'>{course.materialsNeeded}</ReactMarkdown>
                </div>
                </div>
            </form>
            </div>
        </main>
    </div>
    );
}
export default CourseInfo;