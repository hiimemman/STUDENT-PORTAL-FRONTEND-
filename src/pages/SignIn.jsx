import { Suspense } from 'react';
import { LoginForm } from '../component/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  Box, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { PUT_USER, REMOVE_USER } from '../slice/UserSession/userSession';
import { imageBaseUrl } from '../base-url/based-url';
import { useState } from 'react';


export function SignIn() {

//get user
const user = useSelector(state => (state.user.session))

//Navigation
const navigate = useNavigate();
//dispatch from redux
const dispatch = useDispatch();

const [backgroundImage, setBackgroundImage] = useState("https://res.cloudinary.com/dm1ztuuvo/image/upload/v1670145573/loginbackground_djesid.png")

useEffect(() =>{
  if(sessionStorage.getItem('user') !== null){
   navigate('/employee/dashboard')
  } 
 },[])


  return (
    <>
    
   {user !== null ? (<Skeleton
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
    <LoginForm />
  </Box>
</Suspense> 
    
  </>
  )  }
    </>
  );
}