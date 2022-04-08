
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams, useLocation, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useData, useUpdateData } from './Context';
import axios from 'axios';
import Header from './Header';
import ReactMarkdown from 'react-markdown';
import NotFound from './NotFound';
import UpdateCourse from './UpdateCourse';
import CourseSpecs from './CourseSpecs';

const CourseDetail = () => {
    const { user } = useData();
    const [authUser, setAuthUser] = useState(null);
    const {handleDelete, handleCourseUpdate} = useUpdateData();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect( ()=> {

            const getCourse = async () => {
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`)
                setCourse(response.data)
                setIsLoading(false);
              };
              getCourse();


    }, [id]);

    useEffect( () => {
        setAuthUser(user);
    }, [user]);

    useEffect( ()=> {
    handleCourseUpdate(course)
    }, [course]);






return (
    isLoading ?
    <h2>Loading...</h2>
    :
    <main>
    <Header />
     { authUser ? 
        <div className="actions--bar">
        <div className="wrap">
            <button className="button" onClick={ () => navigate('update') }>Update Course</button>
            <button className="button" onClick={ () => handleDelete(id, authUser.emailAddress, authUser.password)}>Delete Course</button>
            <NavLink to={"/"} className="button button-secondary">Return to List</NavLink>
        </div>
        </div>
        :
        <div className="actions--bar">
        <div className="wrap">
            <NavLink to={"/"} className="button button-secondary">Return to List</NavLink>
        </div>
        </div>
    }
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
    );

}
export default CourseDetail;