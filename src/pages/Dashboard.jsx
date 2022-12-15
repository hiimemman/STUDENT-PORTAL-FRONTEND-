import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DrawerAppBar } from '../component/DrawerAppBar';
import { CssBaseline, Paper, Stack} from '@mui/material';
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
import AnnouncementList from '../component/AnnouncementList';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import { experimentalStyled as styled } from '@mui/material/styles';
import Masonry from '@mui/lab/Masonry';


// import myLogo from './aisat-logo.svg'
export function Dashboard(){
  //UseNavigate
    const navigate = useNavigate();
//get user
const user = useSelector(state => JSON.parse(state.user.session))

const dispatch = useDispatch();
    //page current state
    const currentPage = useSelector(state => (state.selectedPage.value));

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

useEffect(() =>{
let isCancelled = false;

dispatch(DASHBOARD());
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
 
        setCourse(getResponse);
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

 useEffect(() =>{
return () => {}
 },[course])






 
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

 const [academicYearDatabase, setAcademicYearDatabase] = useState({});

 const getAcadYearDB = async () =>{
  try{ 
 
    //online api
      const sendRequest = await fetch(basedUrl+"/all-academic-year.php");
      const getResponse = await sendRequest.json();

      if(getResponse.statusCode === 201){
        console.log(getResponse.error)
      }else{
        //if succesfully retrieve data
        console.log(getResponse)
        setAcademicYearDatabase((academicYearDatabase) => academicYearDatabase = getResponse);
      }
  }catch(e){
    console.error(e)
  }
 }

 
 useEffect(() =>{
  getAcadYearDB();
  return () =>{
    
  }
 },[currentPage])

 useEffect(() =>{
return () => {}
 },[academicYearDatabase])


 function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{  width: '260px', bgcolor: 'background.paper' }}>
       <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Academic year
          </Typography>
          <List component="nav" aria-label="main mailbox folders" sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 150,
        '& ul': { padding: 0 },
      }}>
          {academicYearDatabase.length > 0 ? (academicYearDatabase.map((acadyear) =>{
            return (
              <>
        <ListItemButton
          selected={selectedIndex === acadyear.id}
          onClick={(event) => handleListItemClick(event, acadyear.id)}
          key ={acadyear}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary= {acadyear.academicyear} />
        </ListItemButton>
              </>
            )
          })) : null}
      </List>
    </Box>
  );
}

function SelectedListItemSemester() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{  width: '260px', bgcolor: 'background.paper' }}>
       <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Semester
          </Typography>
          <List component="nav" aria-label="main mailbox folders" sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 150,
        '& ul': { padding: 0 },
      }}>
        
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}

        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary= '1st semester' />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
       
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary= '2nd semester' />
        </ListItemButton>
           
      </List>
    </Box>
  );
}







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
               
            
             {/* <section class="container px-6 py-4 mx-auto">
  <div class="grid gap-4 mb-4 md:grid-cols-2 lg:grid-cols-5"> */}


    <Masonry columns={{ xs: 1, sm: 1, md: 4, lg: 4 }} spacing={2}>
      {course.length > 0 ? (course.map((course) => {
       return <DashboardCard  title ={course.course_name} acadyear = {currentAcademicYear} semester = {currentSemester} content ={'course'} icon ={<Avatar style ={{background: "rgba(0, 200, 152, 0.8)"}}>
        <LibraryBooksIcon />
      </Avatar>} />
      })) : null
     }
    </Masonry>
   
          {/* </div>
</section> */}
<Grid container spacing={{ xs: 2, md: 2, lg: 2 }} columns={{ xs: 1, sm: 1, md: 1, lg: 2 }} >
<Paper  elevation={1}  className="w-2/3" >
     <ChartJs dataChart = {data}  />
</Paper>
<Grid>
{/* <SelectedListItem />
<SelectedListItemSemester /> */}
</Grid>
    
</Grid>
     
       
         
      <Stack direction ="column" spacing ={2} style ={{marginTop: '1.5rem'}} className ="w-fit">
            <Typography variant ="h6">News and Updates</Typography>
          <AnnouncementList  />
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