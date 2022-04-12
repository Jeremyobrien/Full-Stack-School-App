import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import {useData, useUpdateData} from './Context';

const PrivateRoute = () => {
    const { user, course, error } = useData();
    const {setError} = useUpdateData();
    console.log(course)
    return ( 
        user ? <Outlet context={{ course, user, error, setError }} /> : <Navigate to={'/signin'}/>
    );
  };

  export default PrivateRoute;