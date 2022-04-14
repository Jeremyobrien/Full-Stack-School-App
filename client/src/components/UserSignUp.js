import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useUpdateData } from './Context';

/* sign up form that renders relevant validation errors or 
signs in new validated user */
const UserSignUp = () => {

    const [inputs, setInputs] = useState({
        firstName:'', 
        lastName:'', 
        emailAddress:'', 
        password:''
      });
    const [errors, setErrors] = useState([]);
    const { createUser } = useUpdateData();
    const navigate = useNavigate();

//either creates and signs in new user or captures errors
    const handleSubmit = (e) => {
            e.preventDefault();
            createUser(inputs)
                .then( res => {
                    if (res) {
                      setErrors(res)                  
                    } else {
                      console.log(`${inputs.emailAddress} is successfully signed up and authenticated!`)
                      }
                    })
                .catch( err => {
                    console.log(err);
                    navigate('/error');
                });
        }
    
    //tracks changes in input fields
    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
      }

 //renders form and conditionally renders validation errors
    return (
    <div>
       <Header />
        <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
          {
                errors.length ?
                  <div>
                    <div className="validation--errors">
                      <h3>Validation Errors</h3>
                      <ul>
                        {errors.map((err, index) => <li key={index}>{err}</li>)}
                      </ul>
                    </div>
                  </div>
                :
                <div></div>
          }
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" onChange={handleInputChange} value={inputs.firstName} />
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text"  onChange={handleInputChange} value={inputs.lastName} />
            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email"  onChange={handleInputChange} value={inputs.emailAddress}/>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"  onChange={handleInputChange} value={inputs.password} />
            <button className="button" type="submit">Sign Up</button><NavLink to={'/'} className="button button-secondary">Cancel</NavLink>
          </form>
          <p>Already have a user account? Click here to <NavLink to={'/signin'}>sign in</NavLink>!</p>
        </div>
      </main>
    </div> 
    );

}

export default UserSignUp;