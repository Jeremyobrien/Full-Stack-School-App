import React from 'react';
import { NavLink } from 'react-router-dom'

const Header = () => {
    return(
        <div>
            <div>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="description" content="Treehouse Full Stack JavaScript Project 10 | Full Stack App with React and a REST API" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
                <title>Courses</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet" />
                <link href="../styles/reset.css" rel="stylesheet" />
                <link href="../styles/global.css" rel="stylesheet" />
            </div>

            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><NavLink to={'/'}>Courses</NavLink></h1>
                    <nav>
                        <ul className="header--signedout">
                            <li><NavLink to={'/signup'}>Sign Up</NavLink></li>
                            <li><NavLink to={'/signin'}>Sign In</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
);
}

export default Header;