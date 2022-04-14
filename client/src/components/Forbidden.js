import React from 'react';
import Header from './Header';

const Forbidden = () => {
    return(
        <>
        <Header />
        <main>
            <div className="wrap">
                <h2>Forbidden</h2>
                <p>Oh oh! You can't access this page.</p>
            </div>
        </main>
        </>
    );
}
export default Forbidden;