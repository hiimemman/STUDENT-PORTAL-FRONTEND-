import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StudentDrawerAppBar } from '../component/StudentDrawerAppBar';
import { CssBaseline, Paper, Stack } from '@mui/material';
// import { DashboardCard } from '../component/DashboardCard/DashboardCard';
import { Suspense } from 'react';;
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import Avatar from '@mui/material/Avatar';
import { basedUrl } from '../../base-url/based-url';
import { DashboardCard } from '../../component/DashboardCard/DashboardCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DASHBOARD } from '../../slice/StudentPageSlice/StudentPageSlice';
import { StudentDashboardCard } from '../component/StudentDashboardCard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import SchoolIcon from '@mui/icons-material/School';
export function StudentDashboard(){

     //UseNavigate
     const navigate = useNavigate();

     const dispatch = useDispatch();
     //get student
     const studentSession = useSelector(state => JSON.parse(state.student.session))

      const [status, setStatus ] = useState('Unenrolled');
      
      useEffect(() =>{
        if(studentSession.section === null){
          setStatus(status => status = 'Enrolled');
        }else{
          setStatus(status => status = 'Unenrolled');
        }

        return () =>{

        }
      },[studentSession])
     useEffect(()=>{
      let isCancelled = false;
      dispatch(DASHBOARD());
      return() => {isCancelled = true}
     })

    useEffect(() =>{
        if(studentSession === null){
         navigate('/student-portal')
        } 
       },[navigate, studentSession]);
    return(
        <>
        {studentSession !== null ?  (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <StudentDrawerAppBar />
        <Suspense fallback = {
   <Skeleton variant="rectangular" width="100%">
   <div style={{ paddingTop: '57%' }} />
 </Skeleton>
} ></Suspense>

<div className="flex flex-col justify-evenly" style={{width:'100%'}}>
             <h2 className ='font-nunito font-bold'>Dashboard</h2>
  <Stack direction ="row" spacing = {2} >
    
  <StudentDashboardCard title ={'Academic year'} content ={studentSession.academicyear} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <CalendarMonthIcon />
  </Avatar>} />
  <StudentDashboardCard title ={'Semester'} content ={studentSession.semester} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <FormatListNumberedRtlIcon />
  </Avatar>} />
  <StudentDashboardCard title ={'Status'} content ={status} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <HowToRegIcon />
  </Avatar>} />
  <StudentDashboardCard title ={'Section and year'} content ={studentSession.section} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <SchoolIcon />
  </Avatar>} />
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
    )
}
