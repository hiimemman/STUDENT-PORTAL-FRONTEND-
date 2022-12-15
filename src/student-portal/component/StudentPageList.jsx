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
import {DASHBOARD, PRE_REGISTRATION, CURRICULUM, SCHEDULE} from '../../slice/StudentPageSlice/StudentPageSlice';
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
import { BALANCE, PROFILE } from '../../slice/StudentPageSlice/StudentPageSlice';

export function StudentPageList(){

 //check current theme
 const selectedTheme = useSelector(state =>(state.selectedTheme.value));
 
  const [selectTheme, setTheme] = useState('');

   //navigate
const navigate = useNavigate();

//check menu state
const isOpen = useSelector(state => (state.isOpen.value))

//page current state
const currentPageStudent = useSelector(state => (state.studentSelectedPage.value));

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
       <Tooltip title="Dashboard" placement="right-start">

    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'dashboard'}  />
      <ListItemButton onClick ={ ()=> {dispatch(DASHBOARD()); navigate('/student-portal/dashboard');} } onMouseEnter = {handleDrawerOpen} 
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
    </Tooltip>
    <Tooltip title="Pre registration" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'pre registration'}  />
      <ListItemButton onClick ={ async ()=> { dispatch(PRE_REGISTRATION()); navigate('/student-portal/pre-registration');} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPageStudent === 'pre registration' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <AppRegistrationIcon/>
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><AppRegistrationIcon/>
      </ListItemIcon>}
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Pre registration</Typography>: <p></p> }  

      </ListItemButton>
      </Stack>
    </ListItem>
</Tooltip>

<Tooltip title="Curriculum" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'curriculum'}  />
      <ListItemButton onClick ={ async ()=> { dispatch(CURRICULUM()); navigate('/student-portal/curriculum');} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPageStudent === 'curriculum' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <ReceiptLongIcon/>
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><ReceiptLongIcon/>
      </ListItemIcon>}
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Curriculum</Typography>: <p></p> }  

      </ListItemButton>
      </Stack>
    </ListItem>
</Tooltip>

<Tooltip title="Schedule" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'schedule'}  />
      <ListItemButton onClick ={ async ()=> { dispatch(SCHEDULE()); navigate('/student-portal/schedule');} } onMouseEnter = {handleDrawerOpen} 
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
        > <DateRangeIcon/>
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><DateRangeIcon/>
      </ListItemIcon>}
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Schedule</Typography>: <p></p> }  

      </ListItemButton>
      </Stack>
    </ListItem>
</Tooltip>

<Tooltip title="Grades" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'grades'}  />
      <ListItemButton onClick ={ async ()=> { dispatch(GRADES()); navigate('/student-portal/grades');} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPageStudent === 'grades' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <GradeIcon/>
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><GradeIcon/>
      </ListItemIcon>}
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Grades</Typography>: <p></p> }  

      </ListItemButton>
      </Stack>
    </ListItem>
</Tooltip>

<Tooltip title="Balance" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'balance'}  />
      <ListItemButton onClick ={ async ()=> { dispatch(BALANCE()); navigate('/student-portal/balance');} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPageStudent === 'balance' ?  <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            
          }}
         style = {{color: selectTheme}}
        > <AccountBalanceWalletIcon/>
        </ListItemIcon> :  
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : 'auto',
          justifyContent: 'center',
          
        }}
      ><AccountBalanceWalletIcon/>
      </ListItemIcon>}
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Balance</Typography>: <p></p> }  

      </ListItemButton>
      </Stack>
    </ListItem>
</Tooltip>

<Tooltip title="Profile" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
<StudentSelectedLine selected ={currentPageStudent === 'profile'}  />
      <ListItemButton onClick ={ async ()=> { dispatch(PROFILE()); navigate('/student-portal/profile');} } onMouseEnter = {handleDrawerOpen} 
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