import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DrawerAppBar } from '../component/DrawerAppBar';
import { CssBaseline } from '@mui/material';
import { DashboardCard } from '../component/DashboardCard/DashboardCard';
import { Suspense } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

// import myLogo from './aisat-logo.svg'
export function Dashboard(){
  //UseNavigate
    const navigate = useNavigate();
//get user
const user = useSelector(state => JSON.parse(state.user.session))


useEffect(() =>{
  if(user === null){
   navigate('/LoginEmployee')
  } 
 },[navigate, user])
    return(
      <>
      {user !== null ?  (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DrawerAppBar />
        <Suspense fallback = {
   <Skeleton variant="rectangular" width="100%">
   <div style={{ paddingTop: '57%' }} />
 </Skeleton>
} ></Suspense>

<div className="flex flex-col justify-evenly" style={{width:'100%'}}>
             <h2 className ='font-nunito font-bold'>Dashboard</h2>
             <Grid2 container spacing={2}>
                <Grid2 xs={3}>
                  <DashboardCard image ={"https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/9qWx-1.png"} title ={'EMPLOYEE ACCOUNT(S)'} content ={'5'} />
                </Grid2>
                <Grid2 xs={3}>
                  <DashboardCard image ={"https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/9qWx-1.png"} title ={'STUDENT ACCOUNT(S)'} content ={'5'} />
                </Grid2>
             </Grid2>
             
</div> 
      </Box>) :  (<Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={1500}
        height={690}
      />
      )}
      </>
    );
}