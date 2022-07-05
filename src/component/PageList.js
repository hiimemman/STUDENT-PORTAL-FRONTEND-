import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import BadgeIcon from '@mui/icons-material/Badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import { Tooltip } from '@mui/material';
export function PageList(){
    //check menu state
const isOpen = useSelector(state => JSON.parse(state.menuState))
   //navigate
const navigate = useNavigate();
return(
    <List>
       <Tooltip title="Dashboard" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300 duration-300">
      <ListItemButton
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
    
        <ListItemText primary = "Dashboard" sx={{ opacity: isOpen ? 1 : 0, }}   onClick ={()=>navigate('/Dashboard')}/>
     
      </ListItemButton>
    </ListItem>
</Tooltip>

    <Tooltip title="Employee list" placement="right-start">
    <ListItem  disablePadding sx={{ display: 'block' }} className="transition ease-in-out delay-2 hover:bg-slate-300  duration-300">
  
      <ListItemButton
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
        
        <ListItemText primary = "Employee"  sx={{ opacity: isOpen ? 1 : 0 }} onClick ={()=>navigate('/Employees')}/>
        
      </ListItemButton>
    
    </ListItem>
  </Tooltip>
</List>
);
}