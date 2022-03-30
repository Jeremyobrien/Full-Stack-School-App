
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams, useLocation, Route, Routes } from 'react-router-dom';
import { useData, useUpdateData } from './Context';
import axios from 'axios';
import Header from './Header';
import ReactMarkdown from 'react-markdown';
import NotFound from './NotFound';
import UpdateCourse from './UpdateCourse';
import CourseInfo from './CourseInfo';

const CourseDetail = () => {

        return (

                <div id="root">
                    <Routes>
                        <Route index element={<CourseInfo />} />
                        <Route path='update' element={ <UpdateCourse />} />
                    </Routes>

                    <Outlet />
                </div>
            )

}


export default CourseDetail;