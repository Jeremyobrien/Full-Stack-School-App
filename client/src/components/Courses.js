import React, { useData } from './Context';
import { NavLink} from 'react-router-dom';
import Header from './Header';

//Renders list of courses and ability to create a new course
const Courses = () => {

    //state
    const { list } = useData();

    return (
            <div id="root">
            <Header />
            <main>
                <div className="wrap main--grid">  
                        {
                            list.map(course =>
                                <NavLink key={course.id} to={`/courses/${course.id}`} className="course--module course--link">
                                    <h2 className="course--label">Course</h2>
                                    <h3 className="course--title">{course.title}</h3>
                                </NavLink>
                                )
                        }
                    <NavLink className="course--module course--add--module" to={'/courses/create'}>
                        <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " /></svg>
                        New Course
                        </span>
                    </NavLink>
                </div>
            </main>
            </div>
    );
}

export default Courses;