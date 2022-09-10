import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  Skeleton } from '@mui/material';
import { DrawerAppBar } from '../component/DrawerAppBar';
import Paper from '@mui/material/Paper';
import { useEffect} from 'react';
import { EmployeeTable } from '../data-table/EmployeeTable';

export  function Employees() {
//get user
const user = useSelector(state => JSON.parse(state.user.session))

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
       <Paper elevation={3}
  style={{
    width: '100%',
    padding: 20,
    marginTop: 70,
    marginRight: 20,
    borderRadius: 10,
  }}>
       <div className="flex flex-col justify-evenly">
             <h2 className ='font-nunito font-bold'>Employees</h2>
             <div style={{ height: 400, width: '100%' }}>
             <EmployeeTable />
         </div>     
       </div>
    
  </Paper>
     
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