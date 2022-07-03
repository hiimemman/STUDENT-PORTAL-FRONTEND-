
import * as React from 'react';
import { MiniDrawer } from '../component/MiniDrawer';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';

export function Dashboard(){
    //global store states from redux dev
  const isLogin = useSelector(state=>state.isAuth)
  //dispatch from redux
  const dispatch = useDispatch();
  //UseNavigate
    const navigate = useNavigate();

    const SessionID = sessionStorage.getItem('session_id');// store session in storage

    useEffect(() => {if(SessionID === ''){
        navigate('/LoginEmployee')
    }})

    return(
   SessionID === ''?<Skeleton variant="rectangular" width={210} height={118} /> :
<MiniDrawer />
    );
}