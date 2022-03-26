
import React, { useData, useUpdateData } from './Context';
import { NavLink } from 'react-router-dom';
import  CreateCourse  from './CreateCourse';
import NotFound from './NotFound';
import CourseDetail from './CourseDetail';

const Courses = () => {
    const { list } = useData();
    const { setQuery } = useUpdateData();

    let courseInfo;

    const handleClick = () => {
        courseInfo = <CourseDetail />
    }

    return (
        <div>
            <ul>
            {
                list.map(course => 
                    <li key={list.indexOf(course)}>
                        <NavLink to={`/${list.indexOf(course)+1}`} >
                        <button onClick={handleClick}>{course.title}</button>
                        </NavLink>
                    </li>)
            }
            </ul>
        <button type='button'>
            Create Course
        </button>
            {/* <Routes>
                <Route path='/' element={<CreateCourse />}>
                    <button type='button'>
                        Create Course
                    </button>
                </Route>
                <Route path="*" element={ <NotFound />} />
            </Routes> */}
        </div>

    //     <main>
    //     <div className="wrap main--grid">
    //       <a className="course--module course--link" href="course-detail.html">
    //         <h2 className="course--label">Course</h2>
    //         <h3 className="course--title">Build a Basic Bookcase</h3>
    //       </a>

    //       <a className="course--module course--add--module" href="create-course.html">
    //         <span className="course--add--title">
    //           <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " /></svg>
    //           New Course
    //         </span>
    //       </a>
    //     </div>
    //   </main>
    );

}

export default Courses;