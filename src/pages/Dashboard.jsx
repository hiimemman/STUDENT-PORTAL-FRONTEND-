import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DrawerAppBar } from '../component/DrawerAppBar';
import { CssBaseline, Stack } from '@mui/material';
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
               <Stack direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}>
  
                  <DashboardCard  title ={'EMPLOYEE'} content ={'5'} />

                  <DashboardCard  title ={'PROFESSOR'} content ={'5'} />
             
                  <DashboardCard  title ={'STUDENT'} content ={'5'} />

                  <DashboardCard  title ={'FACULTY'} content ={'5'} />

                  <DashboardCard  title ={'COURSE'} content ={'5'} />

                  <DashboardCard  title ={'SUBJECT'} content ={'5'} />

                  <DashboardCard  title ={'SECTION'} content ={'5'} />
              </Stack>
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