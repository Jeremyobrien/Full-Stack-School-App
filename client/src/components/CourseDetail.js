
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams, useLocation, Route, Routes } from 'react-router-dom';
import { useData, useUpdateData } from './Context';
import axios from 'axios';
import Header from './Header';
import ReactMarkdown from 'react-markdown';
import NotFound from './NotFound';
import UpdateCourse from './UpdateCourse';
import CourseSpecs from './CourseSpecs';

const CourseDetail = () => {
    
    const {query } = useData();
    const {handleDelete, handleUpdate } = useUpdateData();
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const { id } = useParams();


    useEffect( ()=> {

            const getCourse = async () => {
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`)
                setCourse(response.data)
                setIsLoading(false);
              };
              getCourse();


    }, [id]);


    const handleUpdateReq = () => {
        setIsUpdate(true)
    }


return (
    isLoading ?
    <h2>Loading...</h2>
    :
    isUpdate ?
        <div id="root">
        <Header />
        <UpdateCourse course={course}  />
        </div>
    :
    <div id="root">
        <Header />
        <CourseSpecs course={course} handleUpdateReq={handleUpdateReq} handleDelete={handleDelete} />
        </div>

    );

}
export default CourseDetail;