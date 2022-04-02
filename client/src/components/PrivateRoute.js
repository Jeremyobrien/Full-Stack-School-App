import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import {useData} from './Context';

const PrivateRoute = () => {
    const { user } = useData();
    console.log(user)
    return ( 
        user !== null ? <Outlet /> : <Navigate to={'/signin'}/>
    );
  };

  export default PrivateRoute;