import React from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useData } from './Context';

const CourseSpecs = (props) =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useData();
    return (
        <main>
        { user ? 
            <div className="actions--bar">
            <div className="wrap">
                <button className="button" onClick={ () => navigate('update') }>Update Course</button>
                <button className="button" onClick={ () => props.handleDelete(id)}>Delete Course</button>
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
                    <h4 className="course--name">{props.course.title}</h4>
                    <p>By {props.course.userInfo.firstName} {props.course.userInfo.lastName}</p>
                    <p>{props.course.description}</p>
                </div>
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{props.course.estimatedTime}</p>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ReactMarkdown className='course-detail--list'>{props.course.materialsNeeded}</ReactMarkdown>
                </div>
                </div>
            </form>
            </div>
        </main>
    )
}

export default CourseSpecs;