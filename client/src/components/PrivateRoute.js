import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import {useData} from './Context';

const PrivateRoute = () => {
    const { user, course } = useData();
    return ( 
        user ? <Outlet context={course} /> : <Navigate to={'/signin'}/>
    );
  };

  export default PrivateRoute;