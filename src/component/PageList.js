import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import BadgeIcon from '@mui/icons-material/Badge';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import { Tooltip, Typography } from '@mui/material';
import {CLOSE, OPEN} from  '../slice/MenuSlice/MenuState'
import {useState} from 'react';

export function PageList(){
   //navigate
const navigate = useNavigate();
//isHovered
const {isHovered, setHovered} = useState(false);
//check menu state
const isOpen = useSelector(state => (state.isOpen.value))

 //dispatch from redux
 const dispatch = useDispatch();

  const handleDrawerOpen = () => {  
      dispatch(OPEN())
  };

  const handleDrawerClose = () => {
    dispatch(CLOSE())
  };

return(
    <List>
       <Tooltip title="Dashboard" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
      <ListItemButton onClick ={()=> navigate('/Dashboard')} onMouseEnter = {handleDrawerOpen} onMouseLeave ={handleDrawerClose}
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

    <Tooltip title="Employee list" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block'}} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
  
      <ListItemButton onClick ={()=>navigate('/Employees')}  onMouseEnter = {handleDrawerOpen} onMouseLeave ={handleDrawerClose}
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
        <BadgeIcon />
        </ListItemIcon>
        { isOpen ?  <Typography className ='font-nunito text-lg' >Employees</Typography> : <p></p> }  
      </ListItemButton>
    
    </ListItem>
  </Tooltip>
</List>
);
}