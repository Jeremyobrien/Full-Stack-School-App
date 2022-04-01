import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useData, useUpdateData } from './Context';

const UserSignIn = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState([])
    const { signIn } = useUpdateData();
    const navigate = useNavigate();

    // const { emailAddress, password } = user
    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(inputs.emailAddress, inputs.password)
            .then( authUser => {
                if ( authUser === null) {
                    return setErrors('Sign-in was unsuccessful');
                } else {            
                    console.log(`Sign-in was SUCCESSFUL!`);
                }
            })
            .catch( err => {
                console.log(err);
                navigate('/error');
            })

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
                <form errors={errors} onSubmit={handleSubmit}>
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