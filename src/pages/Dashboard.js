import { useEffect } from 'react';
import { DashboardDrawer } from '../component/DashboardDrawer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export function Dashboard(){
  //UseNavigate
    const navigate = useNavigate();
//get user
const user = useSelector(state => JSON.parse(state.userInfo))


useEffect(() =>{
  if(user === null){
   navigate('/LoginEmployee')
  } 
 })
    return(
      <>
      {user !== null ? (
      <>
      <DashboardDrawer >
          {/* <Typography paragraph>Your email is {user.value.email}
        </Typography> */}
  <p className = "font-bold bg-blend-color-dodge">Your email is {user.value.email}</p>
  
  {/* <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      
      <Paper />
      <Paper elevation={3} />
    </Box> */}
    </DashboardDrawer> 
 
        </>
        ) :  (<Skeleton
    sx={{ bgcolor: 'grey.900' }}
    variant="rectangular"
    width={1500}
    height={690}
  />
  ) }
      </>
    );
}