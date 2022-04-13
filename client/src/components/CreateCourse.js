import React, { useState } from 'react';
import { useUpdateData } from './Context';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Header from './Header';

//Creates a new course
const CreateCourse = () => {
  //state
    const { user }  = useOutletContext();
    const [inputs, setInputs] = useState({
      courseTitle: null, 
      courseDescription: null, 
      estimatedTime: null, 
      materialsNeeded: null, 
      userId: user.id });
    const { handleCreate } = useUpdateData();
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();
    
    //sends POST api call and catches errors for validation UI
    const handleSubmit = (e) => {
            e.preventDefault();
            handleCreate(inputs, user.emailAddress, user.password)
              .then( err => {
                if (err.length) {
                  setErrors(err)
                } else {
                  return;
                }})
              .catch(err => {
                console.log(err)
              navigate('/error');
          })
        }
    
    //keeps track of input values
    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
      }

    /*renders 'Create Course' form and 
    validation errors if 'courseTitle' or 
    'courseDescription' are invalid */
    return (
      <>
        <Header />
        <main>
              <div className="wrap">
                <h2>Create Course</h2>
                {
                  errors.length ?
                  <div>
                    <div className="validation--errors">
                      <h3>Validation Errors</h3>
                      <ul>
                        {errors.map((err, index) => (<li key={index}>{err}</li>))}
                      </ul>
                    </div>
                  </div>
                :
                <div></div>
                }
                <form onSubmit={handleSubmit}>
                  <div className="main--flex">
                    <div>
                      <label htmlFor="title">Course Title</label>
                      <input id="courseTitle" name="courseTitle" type="text" onChange={handleInputChange} value={inputs.courseTitle} />
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
                  <button onClick={ () => navigate('/')} className="button button-secondary">Cancel</button>
                </form>
              </div>
            </main>
      </>
    );
}

export default CreateCourse;