import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useUpdateData } from './Context';

//collects signin information and allows access when applicable
const UserSignIn = () => {
    //state
    const [inputs, setInputs] = useState({});
    const { signIn } = useUpdateData();
    const navigate = useNavigate();
    
    //checks for errors, signs user in 
    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(inputs.emailAddress, inputs.password)
            .then( authUser => {
                if ( authUser === null) {
                    return console.log('Sign-in was unsuccessful');
                } else {            
                    console.log(`Sign-in was SUCCESSFUL!`);
                    navigate('/');
                }
            })
            .catch( err => {
                console.log(err);
                navigate('/error');
            })

    }

    //tracks changes in input fields
    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
      }
    
    //Renders signin page
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