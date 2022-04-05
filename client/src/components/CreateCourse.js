import React, {useState} from 'react';
import { useData, useUpdateData } from './Context';
import { NavLink, useOutletContext } from 'react-router-dom';
import Header from './Header';

const CreateCourse = () => {
    const [inputs, setInputs] = useState({});
    const { handleCreate } = useUpdateData();
    const [ user ]  = useOutletContext();

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
      <div>
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
                      <label htmlFor="courseTitle">Course Title</label>
                      <input id="courseTitle" name="courseTitle" type="text" onChange={handleInputChange} value={inputs.title}  />
                      <p>By {user.firstName} {user.lastName}</p>
                      <label htmlFor="courseDescription">Course Description</label>
                      <textarea id="courseDescription" name="courseDescription" onChange={handleInputChange} value={inputs.description} defaultValue={""} />
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
      </div>

    );

}

export default CreateCourse;