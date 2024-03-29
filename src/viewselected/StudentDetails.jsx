import { Alert, Button, Chip, Divider, FormControl, FormControlLabel, FormHelperText, InputBase,  InputLabel,  NativeSelect, OutlinedInput, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import { useEffect, useState, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Box, Container, RadioGroup, Radio } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { PUT_STUDENT } from '../slice/FormSelectedRow/StudentSelected';
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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { DrawerAppBar } from '../component/DrawerAppBar';
import { Skeleton} from '@mui/material';
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




export function StudentDetails(){

  const {id} = useParams();

  const theme = useTheme();
  //dispatch from redux
  const dispatch = useDispatch();

    //Selected Student
const [student, setStudent] = useState({});

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

//props state

// const [courses, setCourses] = useState(props.course);


//Field states
const [valueTab, setValueTab] = useState(1);//default tab

const [course, setCourse] = useState(student.course);

const [section, setSection] = useState(student.section_name);

const [birthday, setBirthday] = useState(student.birthday);

//Error handlers

const getStudentDetails = async () =>{
  try{ 
    const data = new FormData();
    data.append('StudentID', id);
    console.log(id)
    //online api
       const sendRequest = await fetch(basedUrl+"/student-details.php",{
          method: "POST",
          body: data,
      });
      const getResponse = await sendRequest.json();
      console.log("Student per section "+JSON.stringify(getResponse))
     
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
       
        console.log(getResponse)
        setStudent((prev) => prev = getResponse[0]);
      }
  }catch(e){
    console.error(e)
  }
}

useEffect(() =>{
let isCancelled = false;
getStudentDetails();
return () =>{isCancelled = true}
},[])

useEffect(() =>{
let isCancelled = false;
console.log(student)
return () =>{isCancelled  = true}
},[student])

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
      data.append('StudentNumber', student.studentnumber);
      data.append('Email', student.email)
      data.append('Status', student.status);
      data.append('Action', 'Update');
      data.append('EditorPosition', user.position);
      data.append('EditorEmail', user.email);
      data.append('Category', 'student');
      for (var pair of data.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
      try{
        setisLoading(true);
        //online api
          const sendRequest = await fetch(basedUrl+"/student-update.php",{
              method: "POST",
              body: data,
          });
          
          const getResponse = await sendRequest.json();
          console.log("Reponse here: "+ JSON.stringify(getResponse.statusCode))
          if(getResponse.statusCode !== 201){
            dispatch(PUT_STUDENT(getResponse.statusCode));
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
 
  



 
useEffect(() =>{

  return () =>{
    //student listener
  }

}, [student])

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
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Student id:  </Typography>
      <FormControl >
         <TextField disabled   defaultValue = {student.studentnumber} name ="StudentNumber" id="StudentNumber" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
     </Stack>

      <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Firstname:  </Typography>
      <FormControl >
         <TextField defaultValue = {student.firstname} name ="FirstName" id="FirstName" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
      
     </Stack>   

     <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Middlename:  </Typography>
      <FormControl >
         <TextField defaultValue = {student.middlename} name ="MiddleName" id="MiddleName" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
     </Stack>    

     <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Lastname:  </Typography>
      <FormControl >
         <TextField defaultValue = {student.lastname} name ="LastName" id="LastName" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
     </Stack>   

     <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Email:  </Typography>
      <FormControl >
         <TextField disabled defaultValue = {student.email} name ="Email" id="Email" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
     </Stack>  
     <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Address:  </Typography>
      <FormControl >
         <TextField  defaultValue = {student.address} name ="Address" id="Address" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
      </FormControl>
     </Stack> 
    

{/* <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
  <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Course:  </Typography>
  <FormControl fullWidth variant = "standard"    sx={{fontSize:'15px' , width: '50rem'}}>
    <Select
     required
      id="Course"
      name ="Course"
     value={course}
      onChange={
        (event) => {setCourse((prev) => prev = event.target.value)}
     }  
    >
      {courses.map((course) => (<MenuItem value ={course.course_name}>{course.course_name}</MenuItem>))}  
    </Select>
  </FormControl>
</Stack> */}


{/* <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
  <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Section:  </Typography>
  <FormControl fullWidth variant = "standard"    sx={{fontSize:'15px' , width: '50rem'}}>
    <Select
     required
      id="Section"
      name ="Section"
     value={section}
      onChange={
        (event) => {setSection((prev) => prev = event.target.value)}
     }  
    >
        {console.log("Sections+ "+JSON.stringify(props.section))}
      {props.section.map((sections) => (<MenuItem value ={sections.section_name}>{sections.section_name}</MenuItem>))}  
    </Select>
  </FormControl>
</Stack> */}

<Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
<Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Birthday:  </Typography>
<FormControl sx={{fontSize:'15px' , width: '50rem'}} required>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
            required
            name = "Birthday"
            id = "Birthday"
            value={birthday}
            onChange = {(event) =>{setBirthday(event); return () => {}} }
           // onChange={handleChangeYear}
           renderInput={(params) => <TextField variant ="standard" autoComplete='off' {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
</Stack>
<Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
        <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Contact:  </Typography>
      <FormControl >
         <TextField  defaultValue = {student.contact}  type ="number" name ="Contact" id="Contact" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
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
           {user !== null ?  (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
       <DrawerAppBar />
<Suspense fallback = {
   <Skeleton variant="rectangular" width="100%">
   <div style={{ paddingTop: '57%' }} ></div>
 </Skeleton>
} >
<div className="flex flex-col justify-evenly" style={{width:'100%', marginRight:'1.5rem'}}>
             <h2 className ='font-nunito font-bold'>Subjects</h2>
             
             
        <TabContext value = {valueTab}>
        <Paper elevation={1}>
            <Box  style={{ backgroundImage:`url("https://gstatic.com/classroom/themes/img_code.jpg")`,  backgroundRepeat:'no-repeat', backgroundSize: 'cover', }} sx ={{width:'500', paddingTop:'1.5rem'}} className ="rounded-t-lg">
            <Box component="span" sx={{ p: 3, display: 'flex' ,flexDirection:'column', alignItems: 'center'}}>
                            <Avatar alt="No Image" src={imageBaseUrl+student.profile_url } sx={{ width: 100, height:    100 }} />  
                        <Typography variant = "h5" color ="white">{student.firstname} {student.middlename} {student.lastname} - ({student.studentnumber})</Typography>
                        <Typography variant ="h7" color ="white">{student.email}</Typography>
                        <Typography variant ="h8" color ="white">Student</Typography>
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
    )

}