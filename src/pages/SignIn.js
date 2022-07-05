import { LoginForm } from '../component/LoginForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useEffect } from 'react';

export function SignIn() {

//get user
const user = useSelector(state => (state.user.session))

//Navigation
const navigate = useNavigate();

useEffect(() =>{
 if(user !== null){
  navigate('/Dashboard')
 } 
})
  return (
    <>
   {user !== null ? (<Skeleton
    sx={{ bgcolor: 'grey.900' }}
    variant="rectangular"
    width={1500}
    height={690}
  />
  ) :  (<LoginForm />)  }
    </>
  );
}