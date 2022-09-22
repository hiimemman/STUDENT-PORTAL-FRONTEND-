import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  Skeleton } from '@mui/material';
import { DrawerAppBar } from '../component/DrawerAppBar';
import { useEffect} from 'react';
import { EmployeeTable } from '../data-table/EmployeeTable';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { useState, Suspense } from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from "@mui/material/Avatar";
import { EmployeeView } from '../viewprofile/EmployeeView';

export  function Employees() {
//Selected Employee
const employee = useSelector(state => state.employeeSelected.value)

//get user
const user = useSelector(state => JSON.parse(state.user.session))


const [value, setValue] = useState('1');//default tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //Navigate
  const navigate = useNavigate();
  useEffect(() =>{
    if(user === null){
     navigate('/LoginEmployee')
    } 
   },[user])

  
  return (
    <>{user !== null ?  (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
       <DrawerAppBar />
       {/* <Paper elevation={2}
  style={{
    width: '100%',
    padding: 0,
    marginTop: 70,
    marginRight: 20,
    borderRadius: 10,
  }}> */}
<Suspense fallback = {
   <Skeleton variant="rectangular" width="100%">
   <div style={{ paddingTop: '57%' }} />
 </Skeleton>
} >
       <div className="flex flex-col justify-evenly" style={{width:'100%'}}>
             <h2 className ='font-nunito font-bold'>Employees</h2>
          
             <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' } }>
            <TabList onChange={handleChange} aria-label="lab API tabs example" >
                <Tab label="DATA TABLE" value="1" />
                {employee !== null ? (<Tab value="2" label={<Badge badgeContent={
                <Avatar src={employee.profile_url} sx={{ width: 30, height: 30  }}/> } >
                  PROFILE
                </Badge>} />) : (<Tab value="2" label ="PROFILE" disabled />)}
                
                <Tab label="HISTORY" value="3" />
             </TabList>
            </Box>
        <TabPanel value="1"  style={{height: 'auto'}}>
          <EmployeeTable />
          </TabPanel>
            <TabPanel value="2">
          <EmployeeView /> 
            </TabPanel>
            <TabPanel value="3">3</TabPanel>
          </TabContext>
       </div>
</Suspense>
  {/* </Paper>
      */}
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