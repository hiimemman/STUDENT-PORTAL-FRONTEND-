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
import {DASHBOARD, PRE_REGISTRATION} from '../../slice/StudentPageSlice/StudentPageSlice';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useEffect } from 'react';

import { StudentSelectedLine } from './StudentSelectedLine';
import HailIcon from '@mui/icons-material/Hail';

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
  navigate('/student-portal/pre-registration');
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
<StudentSelectedLine selected ={currentPageStudent === 'pre_registration'}  />
      <ListItemButton onClick ={ async ()=> { dispatch(PRE_REGISTRATION()); navigate('/student-portal/pre-registration');} } onMouseEnter = {handleDrawerOpen} 
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        {currentPageStudent === 'pre_registration' ?  <ListItemIcon
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

</List>
  </>
);
}