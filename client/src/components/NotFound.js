import React from 'react';
import Header from './Header';
//Renders not found route for 404 errors
const NotFound = () => {

    return (
        <>
        <Header />
              <main>
                <div className="wrap">
                  <h2>Not Found</h2>
                  <p>Sorry! We couldn't find the page you're looking for.</p>
                </div>
              </main>
        </>
    );
};

export default NotFound;