import { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  Box, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { PUT_PROFESSOR, REMOVE_PROFESSOR } from '../slice/ProfessorSession/professorSession';
import { imageBaseUrl } from '../base-url/based-url';
import { useState } from 'react';
import { StudentLogin } from './student-component/StudentLogin';
import { ProfessorLogin } from './student-component/ProfessorLogin';

export function ProfessorSignIn() {

//get professor
const professor = useSelector(state => (state.professor.session))

//Navigation
const navigate = useNavigate();
//dispatch from redux
const dispatch = useDispatch();
const [backgroundImage, setBackgroundImage] = useState("https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670145573/loginbackground_djesid.png")
useEffect(() =>{
  if(sessionStorage.getItem('professor') !== null && professor === null){
    dispatch(REMOVE_PROFESSOR());
    dispatch(PUT_PROFESSOR(JSON.stringify(sessionStorage.getItem('professor'))))
   navigate('/professor-portal/dashboard')
  } 
 },[])




  return (
    <>
    
   {professor !== null ? (<Skeleton
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
<ProfessorLogin />
  </Box>
</Suspense> 
    
  </>
  )  }
    </>
  );
}