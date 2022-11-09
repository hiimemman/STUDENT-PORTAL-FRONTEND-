import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  Alert, Skeleton, Snackbar, Stack, Paper, Avatar } from '@mui/material';
import { DrawerAppBar } from '../component/DrawerAppBar';
import { useEffect} from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { useState, Suspense } from 'react';
import { basedUrl } from '../base-url/based-url';
import { SubjectHistory } from '../viewhistory/SubjectHistory';
import { Typography } from '@mui/material';
import { SubjectView } from '../viewprofile/SubjectView';
import { ProfessorTable } from '../data-table/ProfessorTable';
import { imageBaseUrl } from '../base-url/based-url';
import { ProfessorView } from '../viewprofile/ProfessorView';
import { ProfessorHistory } from '../viewhistory/ProfessorHistory';
import { PROFESSOR } from '../slice/PageSlice/PageSlice';

export  function Professor() {
//Selected Professor
const professor = useSelector(state => state.professorSelected.value)

//get user
const user = useSelector(state => JSON.parse(state.user.session));

//get active faculty

const [faculty, setFaculty] = useState({});


const [value, setValue] = useState('1');//default tab

const [open, setOpen] = useState(false);// for snackbar

//snackbar status
const [loginStatus, setStatus] = useState("failed");// default is failed for login atttempt alert

const dispatch = useDispatch();

//Message of snackbar
const [loginMessage, setMessage ] = useState("Try again");// Default message of alert

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};


useEffect(() =>{
let isCancelled = false;

dispatch(PROFESSOR())

return () =>{
  isCancelled = true;
}
},[])

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

   const getAllActiveFaculty = async () =>{

    try{ 

      //online api
        const sendRequest = await fetch(basedUrl+"/faculty-active.php");
        const getResponse = await sendRequest.json();
     
        if(getResponse.statusCode === 201){
        
        }else{
          //if succesfully retrieve data
   
          setFaculty(getResponse);
        }
    }catch(e){
      console.error(e)
    }
  }


   useEffect(() =>{
    getAllActiveFaculty();
    return () =>{
      //exit in memory
    }
   },[value])

   useEffect(() =>{


    return () =>{
      //exit in memory
    }
   },[faculty])
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
             <h2 className ='font-nunito font-bold'>Professor</h2>
          
             <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' } }>
            <TabList onChange={handleChange} aria-label="lab API tabs example" >
                <Tab label="DATA TABLE" value="1" />
                <Tab label="HISTORY" value="2" />
                {professor !== null ? (<Tab value="3" label={
                <Stack direction="row" spacing={2}>
                 <Avatar src={imageBaseUrl+professor.profile_url} sx={{ width: 30, height: 30  }}/>
                <Typography>{professor.firstname}</Typography>
                </Stack>
                } />) : (<></>)}
             </TabList>
            </Box>
        <TabPanel value="1"  style={{height: 'auto'}} sx ={{marginLeft:'-24px'}}>
        <Paper elevation={1} sx ={{width:'500 '}} className ="rounded-xl">
          <ProfessorTable />
          </Paper>
          </TabPanel>
            <TabPanel value="2" sx ={{marginLeft:'-24px'}}>
            <Paper elevation={1} sx ={{width:'500 '}} className ="rounded-xl">
              <ProfessorHistory />
            </Paper>
            </TabPanel>
            <TabPanel value="3" sx ={{marginLeft:'-24px'}}>
              {console.log(faculty)}
              <ProfessorView faculty ={faculty}/>
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