import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import BadgeIcon from '@mui/icons-material/Badge';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import { Tooltip, Typography } from '@mui/material';
import {CLOSE, OPEN} from  '../slice/MenuSlice/MenuState'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Person3Icon from '@mui/icons-material/Person3';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupsIcon from '@mui/icons-material/Groups';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HandymanIcon from '@mui/icons-material/Handyman';
import {DASHBOARD, EMPLOYEE} from '../slice/PageSlice/PageSlice';
import { useEffect } from 'react';

export function PageList(){


  

   //navigate
const navigate = useNavigate();

//check menu state
const isOpen = useSelector(state => (state.isOpen.value))

//page current state
const currentPage = useSelector(state => (state.selectedPage.value));

 //dispatch from redux
 const dispatch = useDispatch();

  const handleDrawerOpen = () => {  
      dispatch(OPEN())
  };

  const handleDrawerClose = () => {
    dispatch(CLOSE())
  };

useEffect(() => {
if(currentPage === 'dashboard'){
  navigate('/employee/dashboard');
}
if(currentPage === 'employee'){
  navigate('/employee/employees')
}
}, [currentPage]);

return(
  <>
    <List>
       <Tooltip title="Dashboard" placement="right-start">

    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
  
      <ListItemButton onClick ={ ()=>dispatch(DASHBOARD()) } selected={currentPage === 'dashboard'}  onMouseEnter = {handleDrawerOpen} onMouseLeave ={handleDrawerClose}
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
        <GridViewIcon/>
        </ListItemIcon>
    
      { isOpen ?  <Typography className ='font-nunito text-lg' >Dashboard</Typography>: <p></p> }  

      </ListItemButton>
    </ListItem>
</Tooltip>

    <Tooltip title="Student list" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
  
      <ListItemButton onClick ={ ()=>dispatch(EMPLOYEE())} selected={currentPage === 'employee'}   onMouseEnter = {handleDrawerOpen} onMouseLeave ={handleDrawerClose}
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
        <PeopleAltIcon />
        </ListItemIcon>
        { isOpen ?  <Typography className ='font-nunito text-lg' >Employees</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>
  <Tooltip title="Student list" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
  
      <ListItemButton onClick ={()=>navigate('/employee/employees')}  onMouseEnter = {handleDrawerOpen} onMouseLeave ={handleDrawerClose}
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
        <Person3Icon />
        </ListItemIcon>
        { isOpen ?  <Typography className ='font-nunito text-lg' >Students</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>
  <Tooltip title="Student list" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
  
      <ListItemButton onClick ={()=>navigate('/employee/employees')}  onMouseEnter = {handleDrawerOpen} onMouseLeave ={handleDrawerClose}
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
        <LibraryBooksIcon />
        </ListItemIcon>
        { isOpen ?  <Typography className ='font-nunito text-lg' >Course</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>
  <Tooltip title="Student list" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
  
      <ListItemButton onClick ={()=>navigate('/employee/employees')}  onMouseEnter = {handleDrawerOpen} onMouseLeave ={handleDrawerClose}
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
        <GroupsIcon />
        </ListItemIcon>
        { isOpen ?  <Typography className ='font-nunito text-lg' >Course</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>
  <Tooltip title="Student list" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
  
      <ListItemButton onClick ={()=>navigate('/employee/employees')}  onMouseEnter = {handleDrawerOpen} onMouseLeave ={handleDrawerClose}
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
        <AnnouncementIcon />
        </ListItemIcon>
        { isOpen ?  <Typography className ='font-nunito text-lg' >Course</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>
  <Tooltip title="Student list" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
  
      <ListItemButton onClick ={()=>navigate('/employee/employees')}  onMouseEnter = {handleDrawerOpen} onMouseLeave ={handleDrawerClose}
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
        <AttachMoneyIcon />
        </ListItemIcon>
        { isOpen ?  <Typography className ='font-nunito text-lg' >Course</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>
  <Tooltip title="Student list" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
  
      <ListItemButton onClick ={()=>navigate('/employee/employees')}  onMouseEnter = {handleDrawerOpen} onMouseLeave ={handleDrawerClose}
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
        <HandymanIcon />
        </ListItemIcon>
        { isOpen ?  <Typography className ='font-nunito text-lg' >Course</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>
 
</List>
  </>
);
}