import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import { Stack, Tooltip, Typography } from '@mui/material';
import {CLOSE, OPEN} from  '../slice/MenuSlice/MenuState'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupsIcon from '@mui/icons-material/Groups';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HandymanIcon from '@mui/icons-material/Handyman';
import {DASHBOARD, EMPLOYEE,PROFESSOR, STUDENT, SUBJECT, COURSE, FACULTY, SECTION, FEE,ACADEMICYEAR, ANNOUNCEMENT,PROFILE,STUDENTREGISTRATION, SEMESTER,ACTIVITY, NULL} from '../slice/PageSlice/PageSlice';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
import BiotechIcon from '@mui/icons-material/Biotech';
import { useEffect } from 'react';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { SelectedLine } from './SelectedLine';
import HailIcon from '@mui/icons-material/Hail';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import DescriptionIcon from '@mui/icons-material/Description';
export function PageList(){

 //check current theme
 const selectedTheme = useSelector(state =>(state.selectedTheme.value));
 
  const [selectTheme, setTheme] = useState('');

    //Current session user
    const user = useSelector(state => JSON.parse(state.user.session))

   //navigate
const navigate = useNavigate();

//check menu state
const isOpen = useSelector(state => (state.isOpen.value))

//page current state
const currentPage = useSelector(state => (state.selectedPage.value));

 //dispatch from redux
 const dispatch = useDispatch();

  const handleDrawerOpen = () => {  
    //Disabled hover open
      // dispatch(OPEN())
  };

  const handleDrawerClose = () => {
    dispatch(CLOSE())
  };

useEffect(() => {
if(currentPage === 'dashboard'){
  // navigate('/employee/dashboard');
}
if(currentPage === 'employee'){
  // navigate('/employee/employees')
}
if(currentPage === 'professor'){
  // navigate('/employee/professor')
}
if(currentPage === 'student'){
  // navigate('/employee/student')
}
if(currentPage === 'subject'){
  // navigate('/employee/subject')
}
if(currentPage === 'department'){
  // navigate('/employee/department')
}
if(currentPage === 'course'){
  // navigate('/employee/course')
}
if(currentPage === 'section'){
  // navigate('/employee/section')
}
if(currentPage === 'fee'){
  // navigate('/employee/fee')
}
if(currentPage === null){
  return () => {}
}
return ()=> {}
}, [currentPage]);

useEffect(()=>{
  if(selectedTheme === 'lightTheme'){
    setTheme('#112444')
   }else{
  setTheme('#00b0ff')
   } 
  return () =>{
     
  }
  },[selectedTheme])


  const [open, setOpen] = useState(false);

  const [openStudent, setOpenStudent ] = useState(false);

  const [openDepartment, setOpenDepartment] = useState(false);

  const [openSchoolYear, setSchoolYear] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickStudent = () => {
    setOpenStudent(!openStudent);
  };

  
  const handleClickDepartment = () => {
    setOpenDepartment(!openDepartment);
  };
  const handleClickSchoolYear = () => {
    setSchoolYear(!openSchoolYear);
  };

return(
  <>
    <List>
       <Tooltip title="Dashboard" placement="right-start">

    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<SelectedLine selected ={currentPage === 'dashboard'}  />
      <ListItemButton onClick ={ ()=> {dispatch(DASHBOARD()); navigate('/employee/dashboard');} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPage === 'dashboard' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <GridViewIcon/>
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><GridViewIcon/>
      </ListItemIcon>}
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Dashboard</Typography>: <p></p> }  

      </ListItemButton>
      </Stack>
    </ListItem>
</Tooltip>
{user.position === 'Admin' ? (
  <>
<ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <Typography className ='font-nunito text-lg' >Manage Staff</Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit> 
    <Tooltip title="Employee(s)" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<SelectedLine selected ={currentPage === 'employee'}  />
      <ListItemButton onClick ={ ()=>{dispatch(EMPLOYEE()); navigate('/employee/employees')}}   onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >

{currentPage === 'employee' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <PeopleAltIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >  <PeopleAltIcon />
      </ListItemIcon>}
        
    
        { isOpen ?  <Typography className ='font-nunito text-lg' >Employee(s)</Typography> : <p></p> }  
      </ListItemButton>
    </Stack>
    </ListItem>
  </Tooltip>

  <Tooltip title="Professor" placement="right-start">

    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<SelectedLine selected ={currentPage === 'professor'}  />
      <ListItemButton onClick ={ ()=>{dispatch(PROFESSOR()); navigate('/employee/professor')} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPage === 'professor' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <HailIcon/>
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><HailIcon/>
      </ListItemIcon>}
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Professor(s)</Typography>: <p></p> }  

      </ListItemButton>
      </Stack>
    </ListItem>
</Tooltip>
</Collapse>
</>) : null}
<ListItemButton onClick={handleClickStudent}>
        <ListItemIcon>
          <SchoolIcon/>
        </ListItemIcon>
        <Typography className ='font-nunito text-lg' >Manage Student</Typography>
        {openStudent ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStudent} timeout="auto" unmountOnExit> 
  <Tooltip title="Student(s)" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<SelectedLine selected ={currentPage === 'student'}  />

      <ListItemButton onClick ={ ()=>{dispatch(STUDENT()); navigate('/employee/student')}}    onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >

        {currentPage === 'student' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <SchoolIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><SchoolIcon />
      </ListItemIcon>}
        { isOpen ?  <Typography className ='font-nunito text-lg' >Student(s)</Typography> : <p></p> }  
      </ListItemButton>
      </Stack>
    </ListItem>
  </Tooltip>

  <Tooltip title="Student(s) Registration" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<SelectedLine selected ={currentPage === 'student registration'}  />

      <ListItemButton onClick ={ ()=>{dispatch(STUDENTREGISTRATION()); navigate('/employee/student-registration')}}    onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >

        {currentPage === 'student registration' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <PendingActionsIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><PendingActionsIcon />
      </ListItemIcon>}
        { isOpen ?  <Typography className ='font-nunito text-lg' >Pre-registration</Typography> : <p></p> }  
      </ListItemButton>
      </Stack>
    </ListItem>
  </Tooltip>
  </Collapse>

  <ListItemButton onClick={handleClickDepartment}>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <Typography className ='font-nunito text-lg' >Academic</Typography>
        {openDepartment ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openDepartment} timeout="auto" unmountOnExit>
  <Tooltip title="Subject(s)" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<SelectedLine selected ={currentPage === 'subject'}  />
      <ListItemButton onClick ={ ()=>{dispatch(SUBJECT()); ; navigate('/employee/subject')}}   onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >

{currentPage === 'subject' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <BiotechIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >  <BiotechIcon />
      </ListItemIcon>}
        
        
        { isOpen ?  <Typography className ='font-nunito text-lg' >Subject</Typography> : <p></p> }  
      </ListItemButton>
    </Stack>
    </ListItem>
  </Tooltip>

  <Tooltip title="Department" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<SelectedLine selected ={currentPage === 'department'}  />
      <ListItemButton onClick ={() => {dispatch(FACULTY()); ; navigate('/employee/faculty')}}  onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPage === 'department' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <Diversity3Icon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >  <Diversity3Icon />
      </ListItemIcon>}

        
        { isOpen ?  <Typography className ='font-nunito text-lg' >Department</Typography> : <p></p> }  
      </ListItemButton>
    </Stack>
    </ListItem>
  </Tooltip>

  <Tooltip title="Course" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<SelectedLine selected ={currentPage === 'course'}  />
      <ListItemButton onClick ={()=>{dispatch(COURSE());navigate('/employee/course') }} onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        {currentPage === 'course' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <LibraryBooksIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >  <LibraryBooksIcon />
      </ListItemIcon>}
        
       
        { isOpen ?  <Typography className ='font-nunito text-lg' >Course</Typography> : <p></p> }  
      </ListItemButton>
    </Stack>
    </ListItem>
  </Tooltip>

  <Tooltip title="Section" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<SelectedLine selected ={currentPage === 'section'}  />
      <ListItemButton onClick ={()=>{dispatch(SECTION());navigate('/employee/section') }} onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        {currentPage === 'section' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <GroupsIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >  <GroupsIcon />
      </ListItemIcon>}
        
       
        { isOpen ?  <Typography className ='font-nunito text-lg' >Section</Typography> : <p></p> }  
      </ListItemButton>
    </Stack>
    </ListItem>
  </Tooltip>

  
 </Collapse>

 <ListItemButton onClick={handleClickSchoolYear}>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <Typography className ='font-nunito text-lg' >School Year</Typography>
        {openSchoolYear ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSchoolYear} timeout="auto" unmountOnExit> 
 <Tooltip title="Academic Year" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <SelectedLine selected ={currentPage === 'academic year'}  />
      <ListItemButton onClick ={()=>{dispatch(ACADEMICYEAR()); navigate('/employee/academicyear')}}  onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
          {currentPage === 'academic year' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <EventAvailableIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >   <EventAvailableIcon />
      </ListItemIcon>}

        {/* <AttachMoneyIcon /> */}
        { isOpen ?  <Typography className ='font-nunito text-lg' >Academic Year</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>

  <Tooltip title="Semester" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <SelectedLine selected ={currentPage === 'semester'}  />
      <ListItemButton onClick ={()=>{dispatch(SEMESTER()); navigate('/employee/semester')}}  onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
          {currentPage === 'semester' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <EventNoteIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >   <EventNoteIcon />
      </ListItemIcon>}

        {/* <AttachMoneyIcon /> */}
        { isOpen ?  <Typography className ='font-nunito text-lg' >Semester</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>
  </Collapse>
  <Tooltip title="Payment" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <SelectedLine selected ={currentPage === 'payment'}  />
      <ListItemButton onClick ={()=>{dispatch(FEE()); navigate('/employee/fee')}}  onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
          {currentPage === 'payment' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <PointOfSaleIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >   <PointOfSaleIcon />
      </ListItemIcon>}

        {/* <AttachMoneyIcon /> */}
        { isOpen ?  <Typography className ='font-nunito text-lg' >Payment</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>

  

  <Tooltip title="Announcement" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <SelectedLine selected ={currentPage === 'announcement'}  />
      <ListItemButton onClick ={()=>{dispatch(ANNOUNCEMENT()); navigate('/employee/announcement')}}  onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
          {currentPage === 'announcement' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <AnnouncementIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >   <AnnouncementIcon />
      </ListItemIcon>}

        {/* <AttachMoneyIcon /> */}
        { isOpen ?  <Typography className ='font-nunito text-lg' >Announcement</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>

  <Tooltip title="Activity Log" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <SelectedLine selected ={currentPage === 'activity log'}  />
      <ListItemButton onClick ={()=>{dispatch(ACTIVITY()); navigate('/employee/activity')}}  onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
          {currentPage === 'activity log' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <DescriptionIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >   <DescriptionIcon />
      </ListItemIcon>}

        {/* <AttachMoneyIcon /> */}
        { isOpen ?  <Typography className ='font-nunito text-lg' >Activity Log</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>

  <Tooltip title="Profile" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
    <SelectedLine selected ={currentPage === 'profile'}  />
      <ListItemButton onClick ={()=>{dispatch(PROFILE()); navigate('/employee/profile')}}  onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
          {currentPage === 'profile' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        >   <AccountCircleIcon />
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      >   <AccountCircleIcon />
      </ListItemIcon>}

        {/* <AttachMoneyIcon /> */}
        { isOpen ?  <Typography className ='font-nunito text-lg' >Profile</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>


</List>
  </>
);
}