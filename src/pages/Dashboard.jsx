import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DrawerAppBar } from '../component/DrawerAppBar';
import { CssBaseline, Paper, Stack } from '@mui/material';
import { DashboardCard } from '../component/DashboardCard/DashboardCard';
import { Suspense } from 'react';;
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HailIcon from '@mui/icons-material/Hail';
import Avatar from '@mui/material/Avatar';
import SchoolIcon from '@mui/icons-material/School';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BiotechIcon from '@mui/icons-material/Biotech';
import GroupsIcon from '@mui/icons-material/Groups';
import { basedUrl } from '../base-url/based-url';
import { ChartJs } from '../component/ChartJs';


// import myLogo from './aisat-logo.svg'
export function Dashboard(){
  //UseNavigate
    const navigate = useNavigate();
//get user
const user = useSelector(state => JSON.parse(state.user.session))

    //page current state
    const currentPage = useSelector(state => (state.selectedPage.value));

//employees
const [employee, setEmployee] = useState('');

//professors
const [professor, setProfessor] = useState('');

//students
const [student, setStudent] = useState('');

//faculty
const [faculty, setFaculty] = useState('');

//course
const [course, setCourse] = useState('');

//subject
const [subject, setSubject] = useState('');

//section
const [section, setSection] = useState('');

//chart data
const [myChartData, setMyChartData ] = useState([]);

//update chart
const [updateChart, setUpdateChart] = useState(false);

useEffect(() =>{
  if(user === null){
   navigate('/LoginEmployee')
  } 
 },[navigate, user]);

 const getAllActiveEmployee = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-employee-active.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setEmployee(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
 }

 const getAllActiveProfessor = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-professor-active.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setProfessor(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
 }

const getAllActiveStudent = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-student-active.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setFaculty(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}

const getAllActiveFaculty = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-faculty-active.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setStudent(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}


const getAllActiveCourse = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-course-active.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setCourse(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}

const getAllActiveSubject = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-subject-active.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setSubject(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}

const getAllActiveSection = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-section-active.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setSection(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}
 useEffect(() =>{
  getAllActiveEmployee();
  getAllActiveProfessor();
  getAllActiveStudent();
  getAllActiveFaculty();
  getAllActiveCourse();
  getAllActiveSubject();
  getAllActiveSection();
  setMyChartData((prev) => prev = [employee, professor, student, faculty, course, subject, section]);
return () =>{
  //exit in memory
}
 },[currentPage])

 useEffect(() =>{

  console.log(myChartData)

  
return () =>{
  //exit in memory
}
 },[myChartData, subject])

 useEffect(() =>{
  console.log(updateChart)
  return () =>{
    //exit in memory
  }
 },[updateChart])

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
  spacing={{ xs: 1, sm: 2, md: 4 }} >
  
                  <DashboardCard  title ={'EMPLOYEE'} content ={employee} icon ={<Avatar className ="bg-teal-600	">
                  <PeopleAltIcon />
          </Avatar>}/>

                  <DashboardCard  title ={'PROFESSOR'} content ={professor}icon ={<Avatar className ="bg-teal-600	">
                  <HailIcon />
          </Avatar>} />
             
                  <DashboardCard  title ={'STUDENT'} content ={student} icon ={<Avatar className ="bg-teal-600	">
                  <SchoolIcon />
          </Avatar>}
          />

                  <DashboardCard  title ={'FACULTY'} content ={faculty} icon ={<Avatar className ="bg-teal-600	">
                  <Diversity3Icon />
          </Avatar>}/>
          <DashboardCard  title ={'COURSE'} content ={course} icon ={<Avatar className ="bg-teal-600	">
            <LibraryBooksIcon />
          </Avatar>} />
                  
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} style ={{marginTop: '1.5rem'}} >
            
           
<DashboardCard  title ={'SUBJECT'} content ={subject} icon ={<Avatar className ="bg-teal-600	">
<BiotechIcon />
          </Avatar>} />

<DashboardCard  title ={'SECTION'} content ={section} icon ={<Avatar className ="bg-teal-600	">
<GroupsIcon />
          </Avatar>} />
              </Stack>
          <Paper  elevation={1} sx ={{m:3,marginLeft:.5, width: '100vh'}} >
          
           <ChartJs data = {myChartData} />
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
    );
}