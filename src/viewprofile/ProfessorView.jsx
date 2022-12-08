import { Alert, Button, Chip, Divider, FormControl, FormHelperText, InputBase,  InputLabel,  NativeSelect, OutlinedInput, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Box, Container } from '@mui/system';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';

import { PUT_PROFESSOR } from '../slice/FormSelectedRow/ProfessorSelected';
import { basedUrl } from '../base-url/based-url';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { imageBaseUrl } from '../base-url/based-url';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { ProfessorScheduleTable } from '../data-table/ProfessorScheduleTable';


//Course select required functions
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, courseName, theme) {
  return {
    fontWeight:
      courseName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}




export function ProfessorView(props){

  const theme = useTheme();
  //dispatch from redux
  const dispatch = useDispatch();

    //Selected Professor
const professor = useSelector(state => state.professorSelected.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

    //Open add form
    const  formOpenType = useSelector(state => state.addFormSub.value);


//Submit is Loading
const [isLoading, setisLoading] = useState(false);


//Snackbar
const [open, setOpen] = useState(false);// for snackbar

//snackbar status
const [loginStatus, setStatus] = useState("failed");// default is failed for login atttempt alert


//Message of snackbar
const [loginMessage, setMessage ] = useState("Try again");// Default message of alert


//Field states
const [valueTab, setValueTab] = useState(1);//default tab

const [faculty, setFaculty] = useState(professor.faculty);

const [yearAvailable, setYearAvailable] = useState(professor.year_available);

const [semesterAvailable, setSemesterAvailable] = useState(professor.semester_available);


//Error handlers

const [errorSubjectName, setErrorSubjectName] = useState('');
const [errorUnits, setErrorUnits] = useState('');
const [errorCourse, setErrorCourse] = useState('');


const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

//End of snackbar


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  



const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));


  //submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submited here")
      const data = new FormData(event.target);
      data.append('Username', professor.professor_username);
      data.append('ID', professor.id);
      data.append('Status', professor.status);
      data.append('Action', 'Update');
      data.append('EditorPosition', user.position);
      data.append('EditorEmail', user.email);
      data.append('Category', 'professor');
      for (var pair of data.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
      try{
        setisLoading(true);
        //online api
          const sendRequest = await fetch(basedUrl+"/professor-update.php",{
              method: "POST",
              body: data,
          });
          
          const getResponse = await sendRequest.json();
          console.log("Reponse here: "+ JSON.stringify(getResponse.statusCode))
          if(getResponse.statusCode !== 201){
            dispatch(PUT_PROFESSOR(getResponse.statusCode));
            setOpen(true);
            setStatus("success");
            setMessage("Updated Successfully")
            setisLoading(false);
           
          }else{
            // setisLoading(false);
            setOpen(true);
            setStatus("error");
            console.log(getResponse.statusCode)
            setMessage('Error see console log for error');
            setisLoading(false);
          }
          
      }catch(e){
        setisLoading(false);
        console.log(e)
        // setMessage(e);
      }
    
  }
 
  


const [courses, setCourses] = useState({data: []});
const [updatedCourse, setUpdatedCourse] = useState(false);
//  Get all users api
 useEffect( () => {
  console.log('UseEffect called')
  const getAllData = async () =>{
     try{ 
       //online api
         const sendRequest = await fetch(basedUrl+"/course-table.php");
         const getResponse = await sendRequest.json();
    
         if(getResponse.statusCode === 201){
         
         }else{
           //if succesfully retrieve data'
          //  console.log(getResponse)
           setCourses({data: getResponse});
            
         }
     }catch(e){
       console.error(e)
     }
   }
   getAllData();
 }, [formOpenType]);

 
useEffect(() =>{

  return () =>{
    //professor listener
  }

}, [professor])

useEffect(() =>{

  return () =>{

  }
},[valueTab])


const OverviewPanel = () =>{
  return(
    <Paper elevation={1} sx ={{width:'500 ', padding:'1.5rem',marginTop:'1.5rem'}} className ="rounded-xl">
    <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
    <Grid2 container sx ={{paddingRight: 10,}} >
      <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Firstname:  </Typography>
      <FormControl >
         <TextField defaultValue = {professor.firstname} name ="FirstName" id="FirstName" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
      
     </Stack>   

     <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Middlename:  </Typography>
      <FormControl >
         <TextField defaultValue = {professor.middlename} name ="MiddleName" id="MiddleName" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
     </Stack>    

     <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Lastname:  </Typography>
      <FormControl >
         <TextField defaultValue = {professor.lastname} name ="LastName" id="LastName" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
     </Stack>   

     <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Email:  </Typography>
      <FormControl >
         <TextField disabled defaultValue = {professor.email} name ="Email" id="Email" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
     </Stack>  

     <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Username:  </Typography>
      <FormControl >
         <TextField disabled defaultValue = {professor.professor_username} name ="Username" id="Username" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
     </Stack>  

 <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
     <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Faculty:  </Typography>

     <FormControl fullWidth variant = "standard"    sx={{fontSize:'15px' , width: '50rem'}}>

    <Select
     required
      id="Faculty"
      name ="Faculty"
     value={faculty}
      onChange={
(event) => {setFaculty((prev) => prev = event.target.value)}
}     
    >
      
      {props.faculty.map((faculties) => (<MenuItem value ={faculties.faculty_name}>{faculties.faculty_name}</MenuItem>))}
      
    </Select>
  </FormControl>
</Stack> 

<Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Date Hired:  </Typography>
      <FormControl >
         <TextField disabled defaultValue = {professor.date_hired} name ="DateHired" id="DateHired" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
     </Stack>  
    
  </Grid2>
         
    <Divider sx={{marginTop: '1.5rem'}} />
    <Container sx ={{m:'1rem',display:'flex', justifyContent:'center'}}>
    {isLoading === true ?( <LoadingButton
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
  )
}

const SchedulePanel = () =>{
  return (
    <>
     <Paper elevation={1} sx ={{width:'500 ',marginTop:'1.5rem'}} className ="rounded-xl">
     <ProfessorScheduleTable />
      </Paper>
    </>
  )
}

const handleChangeTab = (event, newValue) =>{
  setValueTab(newValue);
} 
    return(
        <>
        <TabContext value = {valueTab}>
        <Paper elevation={1}>
            <Box  style={{ backgroundImage:`url("https://gstatic.com/classroom/themes/img_code.jpg")`,  backgroundRepeat:'no-repeat', backgroundSize: 'cover', }} sx ={{width:'500', paddingTop:'1.5rem'}} className ="rounded-t-lg">
            <Box component="span" sx={{ p: 3, display: 'flex' ,flexDirection:'column', alignItems: 'center'}}>
                            <Avatar alt="No Image" src={imageBaseUrl+professor.profile_url } sx={{ width: 100, height:    100 }} />  
                        <Typography variant = "h5" color ="white">{professor.firstname} {professor.middlename} {professor.lastname} - ({professor.professor_username})</Typography>
                        <Typography variant ="h7" color ="white">{professor.email}</Typography>
                        <Typography variant ="h8" color ="white">Professor</Typography>
                    </Box>       
</Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className ="rounded-b-lg"> 
          {console.log("Value tab"+valueTab)}
          
            <TabList onChange = {handleChangeTab} aria-label="lab API tabs example" className='mt-2 ml-2'>
                <Tab label="OVERVIEW" value = {1} />
                <Tab label="SCHEDULES" value= {2} />
                
             </TabList>
            
         
          </Box>
             </Paper >
  
      
             <TabPanel value = {1} sx ={{p:0}}>
                <OverviewPanel />
             </TabPanel>
             
             <TabPanel value  = {2} sx ={{p:0, marginTop:'1.5rem'}}>
               <SchedulePanel />
             </TabPanel>
      </TabContext>        
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity= {loginStatus} sx={{ width: '100%' }}>
                {loginMessage}
             </Alert>
       </Snackbar>
       </>
    )

}