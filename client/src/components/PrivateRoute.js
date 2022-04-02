import React from 'react'
import {Route, Navigate} from 'react-router-dom';
import {useData} from './Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useData();
    return ( 
        user ? (
        <Route {...rest} element={ <Component />} />
        ) : (
        <Route {...rest} element={<Navigate to={'/signin'}/>} />
        )
    );
  };

  export default PrivateRoute;