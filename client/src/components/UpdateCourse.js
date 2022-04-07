import React, {useEffect, useState, useRef, Fragment} from 'react';
import { useUpdateData } from './Context';
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import Header from './Header';

const UpdateCourse = () => {
    const [inputs, setInputs] = useState({});
    const { course } =  useOutletContext();
    const { handleCourseUpdate } = useUpdateData();
    const { id } = useParams();

    const handleSubmit = (e) => {
            e.preventDefault();
            if ( !inputs.title && course.title !== '' ) {
                setInputs({...inputs, title: course.title})
            } else if (!inputs.description && course.description !== ''){
                setInputs({...inputs, description: course.description})
            } 
            handleCourseUpdate(inputs, course.id)
    }

    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
      }

    return (
            <>
            <Header />
            <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="courseTitle" name="title" type="text" onChange={handleInputChange} value={inputs.title} defaultValue={course.title} />
                            <p>By {course.userInfo.firstName} {course.userInfo.lastName}</p>
                            <label htmlFor="description">Course Description</label>
                            <textarea id="courseDescription" name="description" onChange={handleInputChange} value={inputs.description} defaultValue={course.description} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={handleInputChange} value={inputs.estimatedTime} defaultValue={course.estimatedTime} />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleInputChange} value={inputs.materialsNeeded} defaultValue={course.materialsNeeded} />
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <NavLink to={`/courses/${id}`} className="button button-secondary">Cancel</NavLink>
                </form>
            </div>
        </main></>
    );
}

export default UpdateCourse;