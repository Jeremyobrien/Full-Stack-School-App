
import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useData, useUpdateData } from './Context';
import axios from 'axios';
import Header from './Header';
import ReactMarkdown from 'react-markdown';

/*displays specific information about course 
renders 'Update Course' and 'Delete Course' options for authorized users */
const CourseDetail = () => {
    //state
    const { user } = useData();
    const [authUser, setAuthUser] = useState(null);
    const { handleDelete, handleCourseUpdate } = useUpdateData();
    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    //generates course specific information on load
    useEffect( ()=> {
            const getCourse = async () => {
                 await axios.get(`http://localhost:5000/api/courses/${id}`)
                                .then( response => {
                                        setCourse(response.data)
                                        setIsLoading(false);
                                })
                                .catch( error => {
                                    if (error.message === 'Network Error'){
                                        console.log(error.message)
                                        navigate('/error')
                                    } else {
                                        navigate('/notfound')
                                    }
                                })
              };

              getCourse();

    }, [id, navigate]);

    //passes selected course's state to global state
    useEffect( ()=> {
        handleCourseUpdate(course)
    },[course, handleCourseUpdate])

    //sets authUser data for 'handleDelete' function
    useEffect( () => {
        setAuthUser(user);
    }, [user]);

//conditionally renders UI for authenticated users
return (
    isLoading ?
    <h2>Loading...</h2>
    :
    <main>
    <Header />
     { authUser && authUser.id === course.userId ? 
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
                <ReactMarkdown>{course.description}</ReactMarkdown>
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