
import React from 'react';
import { useData } from './Context';

const CourseDetail = () => {

    const {course } = useData();


    return(
    <div>
    {course.title}
    </div>
    )

}


export default CourseDetail;