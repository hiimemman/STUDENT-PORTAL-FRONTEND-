import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import { Stack, Tooltip, Typography } from '@mui/material';
import {CLOSE, OPEN} from '../../slice/StudentMenuSlice/StudentMenuSlice'
import { DASHBOARD, PROFILE, SCHEDULE, GRADING } from '../../slice/ProfessorPageSlice/ProfessorPageSlice';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useEffect } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { StudentSelectedLine } from './StudentSelectedLine';
import DateRangeIcon from '@mui/icons-material/DateRange';
import GradingIcon from '@mui/icons-material/Grading';
import GradeIcon from '@mui/icons-material/Grade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { GRADES } from '../../slice/StudentPageSlice/StudentPageSlice';
import { BALANCE } from '../../slice/StudentPageSlice/StudentPageSlice';
import EventNoteIcon from '@mui/icons-material/EventNote';

export function StudentPageList(){

 //check current theme
 const selectedTheme = useSelector(state =>(state.selectedTheme.value));
 
  const [selectTheme, setTheme] = useState('');

   //navigate
const navigate = useNavigate();

//check menu state
const isOpen = useSelector(state => (state.isOpen.value))

//page current state
const currentPageStudent = useSelector(state => (state.professorSelectedPage.value));

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
if(currentPageStudent === 'pre_registration'){
  // navigate('/student-portal/pre-registration');
}
if(currentPageStudent === null){
  console.log(currentPageStudent)
  return () => {}
}
return ()=> {}
}, [currentPageStudent]);


useEffect(()=>{
  if(selectedTheme === 'lightTheme'){
    setTheme('#01579b')
   }else{
  setTheme('#00b0ff')
   } 
  return () =>{
     
  }
 },[selectedTheme])



return(
  <>
    <List>
       {/* <Tooltip title="Dashboard" placement="right-start">

    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'dashboard'}  />
      <ListItemButton onClick ={ ()=> {dispatch(DASHBOARD()); navigate('/professor-portal/dashboard');} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPageStudent === 'dashboard' ?  <ListItemIcon
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
    </Tooltip> */}



<Tooltip title="Schedule" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'schedule'}  />
      <ListItemButton onClick ={ async ()=> { dispatch(SCHEDULE()); navigate('/professor-portal/schedule');} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPageStudent === 'schedule' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <EventNoteIcon/>
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><EventNoteIcon/>
      </ListItemIcon>}
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Schedule</Typography>: <p></p> }  

      </ListItemButton>
      </Stack>
    </ListItem>
</Tooltip>

<Tooltip title="Grading" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'grading'}  />
      <ListItemButton onClick ={ async ()=> { dispatch(GRADING()); navigate('/professor-portal/grading');} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPageStudent === 'grading' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <GradingIcon/>
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><GradingIcon/>
      </ListItemIcon>}
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Grading</Typography>: <p></p> }  

      </ListItemButton>
      </Stack>
    </ListItem>
</Tooltip>

<Tooltip title="Profile" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'profile'}  />
      <ListItemButton onClick ={ async ()=> { dispatch(PROFILE()); navigate('/professor-portal/profile');} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPageStudent === 'profile' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <AccountCircleIcon/>
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><AccountCircleIcon/>
      </ListItemIcon>}
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Profile</Typography>: <p></p> }  

      </ListItemButton>
      </Stack>
    </ListItem>
</Tooltip>

</List>
  </>
);
}