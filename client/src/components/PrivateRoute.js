import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import {useData} from './Context';

const PrivateRoute = () => {
    const { user, course } = useData();
    // console.log(course)
    return ( 
        user ? <Outlet context={{course, user}} /> : <Navigate to={'/signin'}/>
    );
  };

  export default PrivateRoute;