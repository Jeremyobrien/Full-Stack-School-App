import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useData } from './Context';

/*Passes state to and conditionally renders 
private routes 'CreateCourse' and 'UpdateCourse'. Otherwise, it
directs users to signin page */
const PrivateRoute = () => {
    const { user, course } = useData();

    return ( 
      user ? <Outlet context={{ course, user }} /> : <Navigate to={'/signin'}/>
    );
  };

  export default PrivateRoute;