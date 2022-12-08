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
import { update } from 'react-spring';
import Masonry from '@mui/lab/Masonry';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AnnouncementList from '../component/AnnouncementList';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
export function StudentDashboard(){

     //UseNavigate
     const navigate = useNavigate();

     const dispatch = useDispatch();
     //get student
     const studentSession = useSelector(state => JSON.parse(state.student.session))

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
         navigate('/student-portal')
        } 
       },[navigate, studentSession]);





       const [currentAcademicYear, setCurrentAcademicYear] = useState(null);
       const [currentSemester, setCurrentSemester] = useState(null);

       const getAcadYear = async () =>{
        try{ 
       
          //online api
            const sendRequest = await fetch(basedUrl+"/get-active-academicyear.php");
            const getResponse = await sendRequest.json();

            if(getResponse.statusCode === 201){
              console.log(getResponse.error)
            }else{
              //if succesfully retrieve data
           console.log(getResponse)
              setCurrentAcademicYear((currentAcademicYear) => currentAcademicYear = getResponse[0].academicyear);
            }
        }catch(e){
          console.error(e)
        }
       }

       const getSemester = async () =>{
        try{ 
       
          //online api
            const sendRequest = await fetch(basedUrl+"/get-active-semester.php");
            const getResponse = await sendRequest.json();

            if(getResponse.statusCode === 201){
              console.log(getResponse.error)
            }else{
              //if succesfully retrieve data
              console.log(getResponse)
              setCurrentSemester((currentSemester) => currentSemester = getResponse[0].description);
            }
        }catch(e){
          console.error(e)
        }
       }

       useEffect(() =>{
        getSemester();
        getAcadYear();
        return () =>{
          
        }
       },[currentPage])
       useEffect(() =>{
console.log(currentSemester)
          return () =>{

          }
       },[currentSemester])
console.log(currentAcademicYear)
       useEffect(() =>{
        return () =>{}
       },[currentAcademicYear])


       
    const refreshStudentSession = async () =>{
      // isLoading(true)
      if(selectedYear !== null){
        try{ 
          const data = new FormData();
          data.append('StudentNumber', studentSession.studentnumber);
          
  for (var pair of data.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
}
          //online api
             const sendRequest = await fetch(basedUrl+"/refresh-student-session.php",{
                method: "POST",
                body: data,
            });
            const getResponse = await sendRequest.json();
            console.log(getResponse)
            // isLoading(false)
            if(getResponse.statusCode === 201){
            
            }else{
              dispatch(PUT_STUDENT(getResponse.statusCode))
            }
        }catch(e){
          console.error(e)
        }
      }
     
    }
    
    useEffect(() =>{
      refreshStudentSession();
      return () =>{

      }
    },[currentPage])

    useEffect(() =>{
      return () =>{

      }
    },[studentSession.firstname])



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



  <Masonry columns={{ xs: 1, sm: 1, md: 3, lg: 4 }} spacing={2}> 
  <StudentDashboardCard title ={'Academic year'} content ={currentAcademicYear} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <CalendarMonthIcon />
  </Avatar>} />
  <StudentDashboardCard title ={'Semester'} content ={currentSemester} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <FormatListNumberedRtlIcon />
                  
  </Avatar>} />
  <StudentDashboardCard title ={'Course'} content ={studentSession.course} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <LibraryBooksIcon />
                  
  </Avatar>} />
  {updatedSection === true ?  <StudentDashboardCard title ={'Section'} content ={studentSection.data[0].section_name} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <SchoolIcon />
  </Avatar>} /> : <StudentDashboardCard title ={'Section'} content ={'Unenroled'} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <SchoolIcon />
  </Avatar>} /> }
 
  </Masonry>
  <Paper elevation = {0} marginRight ={'1.5rem'}>
    
  <Alert severity="info">
        <AlertTitle>Notice</AlertTitle>
        Welcome to Asian institute of science and technology - dasma Student Portal. Please take note that <strong>school records</strong> are not directly connected to the <strong>website records.</strong> Therefore, enrollment  transactions made in campus will not immediately reflect in the website. For questions, inquiries or bug reports regarding the portal please contact the Registrar's office in our school.
      </Alert>
      <Stack direction ="column" spacing ={2} style ={{marginTop:'1.5rem'}}>
            <Typography variant ="h6">News and Updates</Typography>
          <AnnouncementList  />
          </Stack>
  </Paper> 
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
