import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  Alert, Paper, Skeleton, Snackbar, Stack } from '@mui/material';
import { DrawerAppBar } from '../component/DrawerAppBar';
import { useEffect} from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { useState, Suspense } from 'react';
import { Typography } from '@mui/material';
import { SelectedLine } from '../component/SelectedLine';
import { SectionTable } from '../data-table/SectionTable';
import { SectionView } from '../viewprofile/SectionView';
import { SectionHistory } from '../viewhistory/SectionHistory';
export  function Section() {
//Selected Section
const section = useSelector(state => state.sectionSelected.value)

//get user
const user = useSelector(state => JSON.parse(state.user.session))


const [value, setValue] = useState('1');//default tab

const [open, setOpen] = useState(false);// for snackbar

//snackbar status
const [loginStatus, setStatus] = useState("failed");// default is failed for login atttempt alert


//Message of snackbar
const [loginMessage, setMessage ] = useState("Try again");// Default message of alert

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //Navigate
  const navigate = useNavigate();
  useEffect(() =>{

    if(user === null){
     navigate('/LoginEmployee')
    } 
    return () =>{
      //exit memory
    }
   },[user])

useEffect(() =>{

  return () =>{
    //section listener
  }

},[section])

useEffect(() =>{
console.log(value)

  return () =>{
    //tab listener
  }
},[value])
  

  return (
    <>  
    {user !== null ?  (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
       <DrawerAppBar />
<Suspense fallback = {
   <Skeleton variant="rectangular" width="100%">
   <div style={{ paddingTop: '57%' }} />
 </Skeleton>
} >
  
       <div className="flex flex-col justify-evenly" style={{width:'100%'}}>
             <h2 className ='font-nunito font-bold'>Subjects</h2>
          <SelectedLine selected ={false}/>
             <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' } }>
            <TabList onChange={handleChange} aria-label="lab API tabs example" >
                <Tab label="DATA TABLE" value="1" />
                <Tab label="HISTORY" value="2" />
                {console.log(section)}
                {section !== null ? (<Tab value="3" label={
                <Stack direction="row" spacing={2}>
                <Typography>{section.section_name}</Typography>
                </Stack>
                } />) : (<></>)}
             </TabList>
            </Box>
        <TabPanel value="1"  style={{height: 'auto'}} sx ={{marginLeft:'-24px'}}>
        <Paper elevation={1} sx ={{width:'500 '}} className ="rounded-xl">
         <SectionTable />
         </Paper>
          </TabPanel>
            <TabPanel value="2" sx ={{marginLeft:'-24px'}}>
            <Paper elevation={1} sx ={{width:'500 '}} className ="rounded-xl">
            <SectionHistory />
            </Paper>
            </TabPanel>
            <TabPanel value="3" sx ={{marginLeft:'-24px'}}>
              <SectionView/>
            </TabPanel>
          </TabContext>
       </div>
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity= {loginStatus} sx={{ width: '100%' }}>
                {loginMessage}
             </Alert>
       </Snackbar>
</Suspense>
  {/* </Paper>
      */}
   </Box>
   ) :  
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