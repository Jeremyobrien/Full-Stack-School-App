import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';

const UserSignIn = () => {
    const [inputs, setInputs] = useState({});
    
    const handleSubmit = (e) => {
        if (e){
            e.preventDefault();
            e.target.reset();
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
                <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email"  onChange={handleInputChange} value={inputs.emailAddress}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={handleInputChange} value={inputs.password} />
                    <button className="button" type="submit">Sign In</button><NavLink to={'/'} className="button button-secondary">Cancel</NavLink>
                </form>
                <p>Don't have a user account? Click here to <NavLink to={'/signup'}>sign up</NavLink>!</p>
                </div>
            </main>
        </div>

    );

}

export default UserSignIn;