import React, {useState} from 'react';
import { useUpdateData } from './Context';
import { NavLink } from 'react-router-dom';

const CreateCourse = (callback) => {
    const [inputs, setInputs] = useState({});

    const { handleCreate } = useUpdateData();
    
    const handleSubmit = (e) => {
        if (e){
            e.preventDefault();
            handleCreate(inputs)
        }
    }

    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
      }

    return (

            <main>
              <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                  <h3>Validation Errors</h3>
                  <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                  </ul>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="main--flex">
                    <div>
                      <label htmlFor="courseTitle">Course Title</label>
                      <input id="courseTitle" name="courseTitle" type="text" onChange={handleInputChange} value={inputs.courseTitle} defaultValue />
                      <p>By Joe Smith</p>
                      <label htmlFor="courseDescription">Course Description</label>
                      <textarea id="courseDescription" name="courseDescription" onChange={handleInputChange} value={inputs.courseDescription} defaultValue={""} />
                    </div>
                    <div>
                      <label htmlFor="estimatedTime">Estimated Time</label>
                      <input id="estimatedTime" name="estimatedTime" type="text" onChange={handleInputChange} value={inputs.estimatedTime} defaultValue />
                      <label htmlFor="materialsNeeded">Materials Needed</label>
                      <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleInputChange} value={inputs.materialsNeeded} defaultValue={""} />
                    </div>
                  </div>
                  <button className="button" type="submit">Create Course</button>
                  <NavLink to ={'/'} className="button button-secondary">Cancel</NavLink>
                </form>
              </div>
            </main>
    );

}

export default CreateCourse;