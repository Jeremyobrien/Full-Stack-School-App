import React from 'react';

//Renders not found route for 404 errors
const NotFound = () => {
    return (
        <li className="not-found">
            <h3>No Results Found</h3>
            <p>Your search did not return any results. Please try again.</p>
        </li>
    );
};

export default NotFound;