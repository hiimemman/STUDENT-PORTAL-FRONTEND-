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
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

export  function Employees() {
//get user
const user = useSelector(state => JSON.parse(state.user.session))


const [value, setValue] = React.useState('1');//default tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          
             <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' } }>
            <TabList onChange={handleChange} aria-label="lab API tabs example" >
                <Tab label="Data Table" value="1" />
                <Tab label="PROFILE" value="2" />
                <Tab label="HISTORY" value="3" />
             </TabList>
            </Box>
        <TabPanel value="1"  style={{height: '400px'}}><EmployeeTable /></TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">3</TabPanel>
          </TabContext>
            
          
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