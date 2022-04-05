import React, {useEffect, useState} from 'react';
import { useUpdateData } from './Context';
import { NavLink } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const UpdateCourse = () => {
    const [inputs, setInputs] = useState(null);
    const { course } =  useOutletContext();
    const { handleUpdate } = useUpdateData();


    const handleSubmit = (e) => {
        if (e){
            e.preventDefault();
            handleUpdate(inputs)
        }
    }

    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
      }

    return (
        <main>
            <div className="wrap">
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input id="courseTitle" name="courseTitle" type="text" onChange={handleInputChange} value={inputs.courseTitle} defaultValue={course.title} />
                    <p>By {course.useInfo.firstName} {course.userInfo.lastName}</p>
                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription" onChange={handleInputChange} value={inputs.courseDescription} defaultValue={course.description} />
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" onChange={handleInputChange} value={inputs.estimatedTime} defaultValue={course.estimatedTime} />
                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleInputChange} value={inputs.materialsNeeded} defaultValue={course.materialsNeeded} />
                </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <NavLink to={'/'} className="button button-secondary">Cancel</NavLink>
            </form>
            </div>
        </main>
    );
}

export default UpdateCourse;