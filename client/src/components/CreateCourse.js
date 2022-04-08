import React, {useState} from 'react';
import { useData, useUpdateData } from './Context';
import { NavLink, useOutletContext } from 'react-router-dom';
import Header from './Header';

const CreateCourse = () => {
    const { user }  = useOutletContext();
    const [inputs, setInputs] = useState({courseTitle: null, courseDescription: null, estimatedTime: null, materialsNeeded: null, userId: user.id });
    const { handleCreate } = useUpdateData();


    const handleSubmit = (e) => {
            e.preventDefault();

            handleCreate(inputs, user.emailAddress, user.password)
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
                      <label htmlFor="title">Course Title</label>
                      <input id="courseTitle" name="courseTitle" type="text" onChange={handleInputChange} value={inputs.courseTitle}  />
                      <p>By {user.firstName} {user.lastName}</p>
                      <label htmlFor="courseDescription">Course Description</label>
                      <textarea id="courseDescription" name="courseDescription" onChange={handleInputChange} value={inputs.courseDescription} defaultValue={""} />
                    </div>
                    <div>
                      <label htmlFor="estimatedTime">Estimated Time</label>
                      <input id="estimatedTime" name="estimatedTime" type="text" onChange={handleInputChange} value={inputs.estimatedTime}  />
                      <label htmlFor="materialsNeeded">Materials Needed</label>
                      <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleInputChange} value={inputs.materialsNeeded} defaultValue={""} />
                    </div>
                  </div>
                  <button className="button" type="submit">Create Course</button>
                  <NavLink to ={'/'} className="button button-secondary">Cancel</NavLink>
                </form>
              </div>
            </main>
      </>
    );

}

export default CreateCourse;