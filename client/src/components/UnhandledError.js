import React from 'react';
import Header from './Header';

const UnhandledError = () => {

return (
    <>
    <Header />
    <main>
        <div className="wrap">
          <h2>Error</h2>
          <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    </main>
    </>
    );

}

export default UnhandledError;