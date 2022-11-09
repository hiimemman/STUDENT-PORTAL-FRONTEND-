import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { DASHBOARD } from '../slice/PageSlice/PageSlice';


// import myLogo from './aisat-logo.svg'
export function Dashboard(){
  //UseNavigate
    const navigate = useNavigate();
//get user
const user = useSelector(state => JSON.parse(state.user.session))

const dispatch = useDispatch();
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

//Inactives


//employees
const [inactiveEmployee, setInactiveEmployee] = useState('');

//professors
const [inactiveProfessor, setInactiveProfessor] = useState('');

//students
const [inactiveStudent, setInactiveStudent] = useState('');

//faculty
const [inactiveFaculty, setInactiveFaculty] = useState('');

//course
const [inactiveCourse, setInactiveCourse] = useState('');

//subject
const [inactiveSubject, setInactiveSubject] = useState('');

//section
const [inactiveSection, setInactiveSection] = useState('');

//chart data
const [myChartData, setMyChartData ] = useState({data:[]});

const [data, setData] = useState({
  labels: ['Employee', 'Professor', 'Student', 'Faculty', 'Course', 'Subject', 'Section'],
  datasets:[
      {
          label: 'Active',
          data: [],
          backgroundColor:[
              'rgba(0, 200, 152, 0.8)',
              
          ]
      }
  ]
})

useEffect(() =>{
let isCancelled = false;

dispatch(DASHBOARD())
return () => {isCancelled = true}
},[])

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
 
        setStudent(getResponse.length);
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

        setFaculty(getResponse.length);
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

const getAllInactiveSection = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-section-inactive.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setInactiveSection(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}

const getAllInactiveSubject = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-subject-inactive.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setInactiveSubject(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}

const getAllInactiveCourse = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-course-inactive.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setInactiveCourse(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}

const getAllInactiveFaculty = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-faculty-inactive.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setInactiveFaculty(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}

const getAllInactiveStudent = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-student-inactive.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setInactiveStudent(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}

const getAllInactiveProfessor = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-professor-inactive.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setInactiveProfessor(getResponse.length);
      }
  }catch(e){
    console.error(e)
  }
}

const getAllInactiveEmployee = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-employee-inactive.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
 
        setInactiveEmployee(getResponse.length);
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

  getAllInactiveEmployee();
  getAllInactiveProfessor();
  getAllInactiveStudent();
  getAllInactiveFaculty();
  getAllInactiveCourse();
  getAllInactiveSubject();
  getAllInactiveSection();
return () =>{
  //exit in memory
}
 },[currentPage])

 useEffect(() =>{  
  setData((prev) =>  prev = {...prev ,  datasets:[
    {
        label: 'Active',
        data: [employee, professor, student, faculty, course, subject, section],
        backgroundColor:[
            'rgba(0, 200, 152, 0.8)',
            
        ],
    },
    {
      label: 'Inactive',
      data: [inactiveEmployee, inactiveProfessor, inactiveStudent, inactiveFaculty, inactiveCourse, inactiveSubject, inactiveSection],
      backgroundColor:[
          'rgba(210, 13, 0, 0.8)',
          
      ],
  }
]
} )

return () =>{
  //exit in memory
}
 },[employee, professor, student, faculty, course, subject, section, inactiveEmployee, inactiveProfessor, inactiveStudent, inactiveFaculty, inactiveCourse, inactiveSubject, inactiveSection])

 useEffect(() =>{

  return () =>{
    //exit in memory
  }
 },[data])

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
  
                  <DashboardCard  title ={'EMPLOYEE'} content ={employee} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <PeopleAltIcon />
          </Avatar>}/>

                  <DashboardCard  title ={'PROFESSOR'} content ={professor}icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <HailIcon />
          </Avatar>} />
             
                  <DashboardCard  title ={'STUDENT'} content ={student} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <SchoolIcon />
          </Avatar>}
          />

                  <DashboardCard  title ={'FACULTY'} content ={faculty} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
                  <Diversity3Icon />
          </Avatar>}/>
          <DashboardCard  title ={'COURSE'} content ={course} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
            <LibraryBooksIcon />
          </Avatar>} />
                  
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} style ={{marginTop: '1.5rem'}} >
            
           
<DashboardCard  title ={'SUBJECT'} content ={subject} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
<BiotechIcon />
          </Avatar>} />

<DashboardCard  title ={'SECTION'} content ={section} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
<GroupsIcon />
          </Avatar>} />
              </Stack>
          <Paper  elevation={1} sx ={{m:3,marginLeft:.5, width: '100vh'}} >
     
           <ChartJs dataChart = {data} />
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