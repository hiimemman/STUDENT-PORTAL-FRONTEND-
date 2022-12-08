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
import { DASHBOARD } from '../../slice/ProfessorPageSlice/ProfessorPageSlice';

import { StudentDashboardCard } from '../component/StudentDashboardCard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import SchoolIcon from '@mui/icons-material/School';
import { update } from 'react-spring';

export function ProfessorDashboard(){

     //UseNavigate
     const navigate = useNavigate();

     const dispatch = useDispatch();
     //get student
     const studentSession = useSelector(state => JSON.parse(state.professor.session))

     const currentPage = useSelector(state =>  (state.studentSelectedPage.value));

     const [studentSection , setStudentSection] = useState({data:{}});
     const [updatedSection, setUpdatedSection] = useState(false);

      const [status, setStatus ] = useState('Unenrolled');


      const getAllStudenSection = async () =>{
        try{ 
          const formData = new FormData();

          formData.append('StudentId', studentSession.studentnumber);
      console.log(studentSession.studentnumber)
          //online api
            const sendRequest = await fetch(basedUrl+"/get-section-per-student.php",{
              method: "POST",
              body: formData,
          });
            const getResponse = await sendRequest.json();

            if(getResponse.statusCode === 201){
              console.log(getResponse.error)
            }else{
              //if succesfully retrieve data
           
              setStudentSection((studentSection => studentSection = {...studentSection , data : getResponse.content}));
            }
        }catch(e){
          console.error(e)
        }
       }
       
       useEffect(() =>{
        getAllStudenSection();
        return() =>{

        }
       },[currentPage])
      
       useEffect(() =>{
        console.log(studentSection.data)
        if(studentSection.data.length > 0){
          setUpdatedSection((updatedSection => updatedSection = true))
        }
        return () => {}
       },[studentSection.data])

   useEffect(() =>{

    return () =>{}
   },[updatedSection])

     useEffect(()=>{
      let isCancelled = false;
      dispatch(DASHBOARD());
      return() => {isCancelled = true}
     },[])

    useEffect(() =>{
        if(studentSession === null){
         navigate('/professor-portal')
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
