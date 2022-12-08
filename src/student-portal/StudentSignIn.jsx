import { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  Box, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import {PUT_STUDENT, REMOVE_STUDENT } from '../slice/StudentSession/studentSession';
import { imageBaseUrl } from '../base-url/based-url';
import { useState } from 'react';
import { StudentLogin } from './student-component/StudentLogin';

export function StudentSignIn() {

//get student
const student = useSelector(state => (state.student.session))

//Navigation
const navigate = useNavigate();
//dispatch from redux
const dispatch = useDispatch();
const [backgroundImage, setBackgroundImage] = useState("https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670145573/loginbackground_djesid.png")
useEffect(() =>{
  if(sessionStorage.getItem('student') !== null && student === null){
    dispatch(REMOVE_STUDENT());
    dispatch(PUT_STUDENT(JSON.stringify(sessionStorage.getItem('student'))))
   navigate('/student-portal/dashboard')
  } 
 },[])




  return (
    <>
    
   {student !== null ? (<Skeleton
    sx={{ bgcolor: 'grey.900' }}
    variant="rectangular"
    width={1500}
    height={690}
  />
  ) :  (
    <>
    <Suspense fallback = {
      <Skeleton variant="rectangular" width={210}
      height={118}></Skeleton>
    }>
      
    <Box
    sx={{
      backgroundImage:`url("`+backgroundImage+`")`,  backgroundRepeat:'no-repeat', backgroundSize: 'cover',    
    }}
  >
<StudentLogin />
  </Box>
</Suspense> 
    
  </>
  )  }
    </>
  );
}