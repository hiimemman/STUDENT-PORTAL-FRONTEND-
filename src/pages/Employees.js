import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import BadgeIcon from '@mui/icons-material/Badge';
import { ProfileBox } from '../component/ProfileBox';
import { useNavigate } from 'react-router-dom';
import { Skeleton, Typography } from '@mui/material';
import { DrawerAppBar } from '../component/DrawerAppBar';
import { Container } from '@mui/system';



export  function Employees() {
  const theme = useTheme();

//get user
const user = useSelector(state => JSON.parse(state.user.session))

  //check menu state
  const isOpen = useSelector(state => (state.isOpen.value))

 
  //Navigate
  const navigate = useNavigate();
  useEffect(() =>{
    if(user === null){
     navigate('/LoginEmployee')
    } 
   })
 

  return (
    <>{user !== null ?  (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
       <DrawerAppBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         <div className="flex flex-row justify-evenly mt-10">
             <p className ='font-nunito'> Employee Body</p>
         </div>
     </Box>
   </Box>) :  
   (<Skeleton
    sx={{ bgcolor: 'grey.900' }}
    variant="rectangular"
    width={1500}
    height={690}
  />
  )}
   
    </>
  );
}