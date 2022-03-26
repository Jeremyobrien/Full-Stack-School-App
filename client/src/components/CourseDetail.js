
import React, { useData } from './Context';

const CourseDetail = () => {

    const { course, query } = useData();

            return (
            <div>
                <h3>{course.title}</h3>
                <h3>{course.description}</h3>
            </div>
            )
}


export default CourseDetail;