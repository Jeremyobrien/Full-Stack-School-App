import React, { useEffect } from 'react';
import Courses from './Courses';
import { useUpdateData } from './Context';
import { useNavigate } from 'react-router-dom';

const UserSignOut = () => {
    const {signOut} = useUpdateData();
    let navigate = useNavigate();
    


    useEffect( () => {

        const signOutUser = async () => {
            await signOut();
            navigate('/')
            return null;
        }
        signOutUser();
    }, [])

    return null;

}

export default UserSignOut;