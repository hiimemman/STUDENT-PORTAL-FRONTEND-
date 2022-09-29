import { LoginForm } from '../component/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { PUT_USER, REMOVE_USER } from '../slice/UserSession/userSession';
import { ParticlesBackground } from '../component/ParticlesBackground';
export function SignIn() {

//get user
const user = useSelector(state => (state.user.session))

//Navigation
const navigate = useNavigate();
//dispatch from redux
const dispatch = useDispatch();

useEffect(() =>{
  if(sessionStorage.getItem('user') !== null && user === null){
    dispatch(REMOVE_USER());
    dispatch(PUT_USER(JSON.stringify(sessionStorage.getItem('user'))))
   navigate('/Dashboard')
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
    
    <LoginForm />
    
  </>
  )  }
    </>
  );
}