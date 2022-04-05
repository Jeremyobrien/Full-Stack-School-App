import React from 'react'
import {Navigate, Outlet, useOutletContext} from 'react-router-dom';
import {useData} from './Context';
import UpdateCourse from './UpdateCourse';

const PrivateRoute = () => {
    const { user, course } = useData();
    return ( 
        user ? <Outlet context={course} /> : <Navigate to={'/signin'}/>
    );
  };

  export default PrivateRoute;