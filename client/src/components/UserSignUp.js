import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useUpdateData } from './Context';

const UserSignUp = () => {

    const [inputs, setInputs] = useState({});
    const [err, setErr] = useState([]);
    const { createUser } = useUpdateData();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
            e.preventDefault();
            createUser(inputs)
                // .then( errors => {
                //     if (errors) {
                //         setErr(errors)
                //     } else {
                //         console.log(`${inputs.emailAddress} is successfully signed up and authenticated!`)
                //       }
                //     })
                // .catch( err => {
                //     console.log(err);
                //     navigate('/error');
                // });
        }

    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
      }

    return (
    <div>
       <Header />
        <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
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