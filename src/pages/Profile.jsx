import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  Alert, Skeleton, Snackbar, Stack, Paper, Avatar, TextField, FormControl, FormControlLabel, FormHelperText, Divider, Container, Button, Select, MenuItem, Input} from '@mui/material';
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
import { PROFILE } from '../slice/PageSlice/PageSlice';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import UploadWidget from '../component/UploadWidget';
import { PUT_USER } from '../slice/UserSession/userSession';

export  function Profile() {
//Selected Professor
const professor = useSelector(state => state.professorSelected.value)

//get user
const user = useSelector(state => JSON.parse(state.user.session));

//get active faculty

const [faculty, setFaculty] = useState({});


//Field states
const [valueTab, setValueTab] = useState(1);//default tab

const [value, setValue] = useState('1');//default tab

const [open, setOpen] = useState(false);// for snackbar

const [loading, isLoading] = useState(false);

//snackbar status
const [loginStatus, setStatus] = useState("failed");// default is failed for login atttempt alert

const dispatch = useDispatch();

//Message of snackbar
const [loginMessage, setMessage ] = useState("Try again");// Default message of alert

//State
const [currentPassword, setCurrentPassword] = useState(null);
const [newPassword, setNewPassword] = useState(null);
const [confirmPassword, setConfirmPassword] = useState(null);

//error state
const [errorNewPassword, setErrorNewPassword] = useState('');
const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
                                    
const [errorNewPasswordText, setNewPasswordText] = useState('');

const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState(null);


const [announcementImageUrl, setAnnouncementImageurl] = useState('No image selected');

const [restrictedSubmit , setRestrictedSubmit] = useState(false);

const handleChangeNewPassword = (event)  =>{
  if(event.target.value.toString().length < 8){
    setErrorNewPassword(errorNewPassword => errorNewPassword = true);
    setNewPasswordText(errorNewPasswordText => errorNewPasswordText = 'Password must not be 8 characters below');
  }else{
    setNewPassword(newPassword => newPassword = event.target.value);
    setErrorNewPassword(errorNewPassword => errorNewPassword = false);
  }
  
}

useEffect(() =>{


  return () =>{

  }
},[errorNewPasswordText])

const handleChangeConfirmPassword = (event) =>{
  
  if(newPassword !== null && newPassword === event.target.value){
    setErrorConfirmPassword(errorConfirmPassword => errorConfirmPassword = false)
    setConfirmPassword(confirmPassword => confirmPassword = event.target.value);
  }else{
    setErrorConfirmPassword(errorConfirmPassword => errorConfirmPassword = true)
  }
}

useEffect(() =>{

  return () =>{}
},[errorConfirmPassword])

useEffect(() =>{

  return () =>{}
},[newPassword])

useEffect(() =>{

  return () =>{}
},[confirmPassword])

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};


useEffect(() =>{
let isCancelled = false;

dispatch(PROFILE())

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

   //submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submited here")
      const data = new FormData(event.target);
      data.append('StudentNumber', user.studentnumber);
      data.append('Email', user.email)
      data.append('Status', user.status);
      data.append('Action', 'Update');
      data.append('EditorPosition', user.position);
      data.append('EditorEmail', user.email);
      data.append('Category', 'Profile');
      for (var pair of data.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
      try{
        isLoading(true);
        //online api
          const sendRequest = await fetch(basedUrl+"/student-update.php",{
              method: "POST",
              body: data,
          });
          
          const getResponse = await sendRequest.json();
          console.log("Reponse here: "+ JSON.stringify(getResponse.statusCode))
          if(getResponse.statusCode !== 201){
            setOpen(true);
            setStatus("success");
            setMessage("Updated Successfully")
            isLoading(false);
           
          }else{
            // isLoading(false);
            setOpen(true);
            setStatus("error");
            console.log(getResponse.statusCode)
            setMessage('Error see console log for error');
            isLoading(false);
          }
          
      }catch(e){
        isLoading(false);
        console.log(e)
        // setMessage(e);
      }
    
  }
 
  const handleSubmitChangePassword = async (event) =>{
    event.preventDefault();
    console.log("Submited here")
    if(!errorCurrentPassword && !errorConfirmPassword && !errorNewPassword){
      const data = new FormData(event.target);
      data.append('Email', user.email)
      for (var pair of data.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
      try{
        isLoading(true);
        //online api
          const sendRequest = await fetch(basedUrl+"/change-confirmed-password.php",{
              method: "POST",
              body: data,
          });
          
          const getResponse = await sendRequest.json();
          console.log("Reponse here: "+ JSON.stringify(getResponse.statusCode))
          if(getResponse.statusCode === 200){
            setOpen(true);
            setStatus("success");
            setMessage("Updated Successfully")
            isLoading(false);
           
          }else{
            // isLoading(false);
            setOpen(true);
            setStatus("error");
            console.log(getResponse.statusCode)
            setMessage('Error see console log for error');
            isLoading(false);
          }
          
      }catch(e){
        isLoading(false);
        console.log(e)
        // setMessage(e);
      }
    }else{
      setOpen(true);
      setStatus("error");
      setMessage('Please fill out all the fields');
      isLoading(false);
    }
  }

   const handleChangeTab = (event, newValue) =>{
    setValueTab(newValue);
  } 

  

  const handleSubmitProfile = async (event) =>{
    event.preventDefault();
  

    try{
      const data = new FormData(event.currentTarget);
    if(announcementImageUrl !== 'No image selected'){
      data.append('ImageUrl', announcementImageUrl)
    }else{
      data.append('ImageUrl', user.profile_url)
    }
    data.append('Email', user.email);
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
      const sendRequest = await fetch(basedUrl+"/admin-profile-edit.php",{
        method: "POST",
        body: data,
    });
  
    const getResponse = await sendRequest.json();
    console.log(getResponse.information)
    if(getResponse.statusCode === 200){
    
      dispatch(PUT_USER(getResponse.information))
    }else{
      
    }
  
    }catch(e){
      
    }  

   
  }

  const handleChangePicture = async (event) =>{
    event.preventDefault();
    try{
      const data = new FormData(event.currentTarget);
    if(announcementImageUrl !== 'No image selected'){
      data.append('ImageUrl', announcementImageUrl)
    }else{
      data.append('ImageUrl', user.profile_url)
    }
    data.append('Email', user.email);
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
      const sendRequest = await fetch(basedUrl+"/admin-change-picture.php",{
        method: "POST",
        body: data,
    });
  
    const getResponse = await sendRequest.json();
    console.log(getResponse.information)
    if(getResponse.statusCode === 200){
     dispatch(PUT_USER(getResponse.content));
    }else{
      
     }
    }catch(e){  
    }  
  }

const checkCurrentPassword = async(event) =>{

  try{
    const data = new FormData();
    data.append('Email', user.email)
    data.append('Password', event.target.value);
    const sendRequest = await fetch(basedUrl+"/check-password-correct.php",{
      method: "POST",
      body: data,
  });

  const getResponse = await sendRequest.json();
  console.log(getResponse)
  if(getResponse.statusCode === 200){
    setErrorCurrentPassword(errorCurrentPassword => errorCurrentPassword = false)
  }else{
    setErrorCurrentPassword(errorCurrentPassword => errorCurrentPassword = true)
  }

  }catch(e){
    setErrorCurrentPassword(errorCurrentPassword => errorCurrentPassword = true)
  }  
}

useEffect(() =>{

  return () =>{}
},[errorCurrentPassword])

const handleImageLoad = (event) =>{
  setAnnouncementImageurl(announcementImageUrl => announcementImageUrl = event.target.currentSrc)
  }

  const handleSubmitAvatar =  async () =>{

  }

  const ChangeInformationPanel = () =>{
    return (<>
        <Paper elevation={1} sx={{ width: '500 ', padding: '1.5rem', marginTop: '1.5rem', marginRight: 
'1.5rem' }} className="rounded-xl">
    <Box component="form" onSubmit={handleSubmitProfile} sx={{ mt: 1 }}>
      <Grid2 container sx={{ paddingRight: 10, }}>
    

        <Stack direction="row" spacing={2} sx={{ width: '100%', marginBottom: '1.5rem' }}>
          <Typography variant="overline" noWrap sx={{ fontSize: '15px', width: '15rem' }}>First name:  </Typography>
          <FormControl fullWidth>
            <TextField defaultValue={user.firstname} name="FirstName" id="FirstName" sx={{ fontSize: '15px' }} variant="standard" inputProps={{ 'aria-label': 'description' }} />
          </FormControl>

        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: '100%', marginBottom: '1.5rem' }}>
          <Typography variant="overline" noWrap sx={{ fontSize: '15px', width: '15rem' }}>Middle name:  </Typography>
          <FormControl fullWidth>
            <TextField defaultValue={user.middlename} name="MiddleName" id="MiddleName" sx={{ fontSize: '15px' }} variant="standard" inputProps={{ 'aria-label': 'description' }} />
          </FormControl>

        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: '100%', marginBottom: '1.5rem' }}>
          <Typography variant="overline" noWrap sx={{ fontSize: '15px', width: '15rem' }}>Last name:  </Typography>
          <FormControl fullWidth>
            <TextField defaultValue={user.lastname} name="LastName" id="LastName" sx={{ fontSize: '15px' }} variant="standard" inputProps={{ 'aria-label': 'description' }} />
          </FormControl>

        </Stack>

  
 <Stack direction="row" spacing={2} sx={{ width: '100%', marginBottom: '1.5rem' }}>
          <Typography variant="overline" noWrap sx={{ fontSize: '15px', width: '15rem' }}>Birthday:  </Typography>
          <FormControl fullWidth>
            <TextField defaultValue={user.birthday} type ="date" name="Birthday" id="Birthday" sx={{ fontSize: '15px' }} variant="standard" inputProps={{ 'aria-label': 'description' }} />
          </FormControl>

        </Stack>
     <Stack direction="row" spacing={2} sx={{ width: '100%', marginBottom: '1.5rem' }}>
          <Typography variant="overline" noWrap sx={{ fontSize: '15px', width: '15rem' }}>Contact:  </Typography>
          <FormControl fullWidth>
            <TextField defaultValue={user.contact} name="Contact" id="Contact" sx={{ fontSize: '15px' }} variant="standard" inputProps={{ 'aria-label': 'description' }} />
          </FormControl>

        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: '100%', marginBottom: '1.5rem' }}>
          <Typography variant="overline" noWrap sx={{ fontSize: '15px', width: '15rem' }}>Address:  </Typography>
          <FormControl fullWidth>
            <TextField required defaultValue={user.address} name="Address" id="Address" sx={{ fontSize: '15px' }} variant="standard" inputProps={{ 'aria-label': 'description' }} />
          </FormControl>

        </Stack>

      </Grid2>


      <Divider sx={{ marginTop: '1.5rem' }} />
      <Container sx={{ m: '1rem', display: 'flex', justifyContent: 'center' }}>
        {loading === true ? (<LoadingButton
          color="secondary"
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Sending
        </LoadingButton>) : (<Button type="submit"  variant="contained" color="success">Save Changes</Button>)}
      </Container>
    </Box>
  </Paper></>)
  }

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
          
             <>
        <TabContext value = {valueTab}>
        <Paper elevation={1} sx ={{marginRight: '1.5rem'}}>
            <Box  style={{ backgroundImage:`url("https://gstatic.com/classroom/themes/img_code.jpg")`,  backgroundRepeat:'no-repeat', backgroundSize: 'cover', }} sx ={{width:'500', paddingTop:'1.5rem'}} className ="rounded-t-lg">
            <Box component="span" sx={{ p: 3, display: 'flex' ,flexDirection:'column', alignItems: 'center'}}>
                            <Avatar alt="No Image" src={user.profile_url } sx={{ width: 100, height:    100 }} />  
                        <Typography variant = "h5" color ="white">{user.firstname} {user.middlename} {user.lastname}</Typography>
                        <Typography variant ="h7" color ="white">{user.email}</Typography>
                        <Typography variant ="h8" color ="white">{user.position}</Typography>
                    </Box>       
</Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className ="rounded-b-lg"> 
          {console.log("Value tab"+valueTab)}
          
            <TabList onChange = {handleChangeTab} aria-label="lab API tabs example" className='mt-2 ml-2'>
                <Tab label="INFORMATION" value = {1} />
                <Tab label="CHANGE PASSWORD" value= {2} />
                <Tab label="CHANGE AVATAR" value= {3} />
                
             </TabList>
            
         
          </Box>
             </Paper >
  
      
             <TabPanel value = {1} sx ={{p:0}}>
             <ChangeInformationPanel /> 

             </TabPanel>
             
             <TabPanel value  = {2} sx ={{p:0, marginTop:'1.5rem'}}>
             <Paper elevation={1} sx={{ width: '500 ', padding: '1.5rem', marginRight: 
'1.5rem' }} className="rounded-xl">
    <Box component="form" sx={{ mt: 1 }} onSubmit ={handleSubmitChangePassword}>
      <Grid2 container sx={{ paddingRight: 10, }}>
    

        <Stack direction="row" spacing={2} sx={{ width: '100%', marginBottom: '1.5rem' }}>
          <Typography variant="overline" noWrap sx={{ fontSize: '15px', width: '15rem' }}>Current Password:  </Typography>
          <FormControl fullWidth >
            <TextField defaultValue ={currentPassword} required onChange ={checkCurrentPassword} type ="password" name="Password" id="Password" sx={{ fontSize: '15px' }} variant="standard" inputProps={{ 'aria-label': 'description' }} error ={errorCurrentPassword}/>
            {errorCurrentPassword === true? (<FormHelperText id="component-error-text" error ={errorCurrentPassword} >Wrong password!</FormHelperText>) : (<></>)}
            
          </FormControl>

        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: '100%', marginBottom: '1.5rem' }}>
          <Typography variant="overline" noWrap sx={{ fontSize: '15px', width: '15rem' }}>New Password:  </Typography>
          <FormControl fullWidth>
            <TextField  onChange ={handleChangeNewPassword} required error ={errorNewPassword} type ="password" name="NewPassword" id="NewPassword" sx={{ fontSize: '15px' }} variant="standard" inputProps={{ 'aria-label': 'description' }} />
            {errorNewPassword === true? (<FormHelperText id="component-error-text" error ={errorNewPassword} >New password must be atleast 8 characters long</FormHelperText>) : (<></>)}
          </FormControl>

        </Stack>
     
        <Stack direction="row" spacing={2} sx={{ width: '100%', marginBottom: '1.5rem' }}>
          <Typography variant="overline"  noWrap sx={{ fontSize: '15px', width: '15rem' }}>Confirm Password:  </Typography>
          <FormControl fullWidth>
            <TextField  onChange = {handleChangeConfirmPassword} required type ="password" name="ConfirmPassword" id="ConfirmPassword" sx={{ fontSize: '15px' }} variant="standard" inputProps={{ 'aria-label': 'description' }} error ={errorConfirmPassword} />
            {errorConfirmPassword === true? (<FormHelperText id="component-error-text" error ={errorConfirmPassword} >Password doesn't match!</FormHelperText>) : (<></>)}
          </FormControl>

        </Stack>
      </Grid2>


      <Divider sx={{ marginTop: '1.5rem' }} />
      <Container sx={{ m: '1rem', display: 'flex', justifyContent: 'center' }}>
        {loading === true ? (<LoadingButton
          color="secondary"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Sending
        </LoadingButton>) : (<Button type="submit" variant="contained" color="success">Save Changes</Button>)}
      </Container>
    </Box>
  </Paper>
             </TabPanel>

             <TabPanel value = {3} sx ={{p:0}}>
             <Paper elevation={1} sx={{ width: '500 ', padding: '1.5rem', marginTop: '1.5rem', marginRight: 
'1.5rem' }} className="rounded-xl">
    <Box component="form"  sx={{ mt: 1 }} onSubmit = {handleChangePicture}>
      <Grid2 container sx={{ paddingRight: 10, }}>
    
      <Grid2 item xs={12}>
          <Stack direction ="column" spacing ={2}>
          <Typography variant ="body">Profile Image</Typography>
            <img id="uploadedimage" src="" onLoad={handleImageLoad} style ={{maxWidth:'200px', maxHeight:'200px',marginBottom:'.5rem'}} ></img>
          </Stack>
      <Stack direction ="row" spacing = {2} > 
        <UploadWidget  />
        <Typography variant ="body" id = 'ImageFileNameXD' body ="asd"  ></Typography>
      </Stack>
    </Grid2>
 </Grid2>


      <Divider sx={{ marginTop: '1.5rem' }} />
      <Container sx={{ m: '1rem', display: 'flex', justifyContent: 'center' }}>
        {loading === true ? (<LoadingButton
          color="secondary"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Sending
        </LoadingButton>) : (<Button type="submit"  variant="contained" color="success">Save Changes</Button>)}
      </Container>
    </Box>
  </Paper>
             </TabPanel>
      </TabContext>        
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity= {loginStatus} sx={{ width: '100%' }}>
                {loginMessage}
             </Alert>
       </Snackbar>
       </>
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