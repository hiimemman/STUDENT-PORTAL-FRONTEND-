import { Alert, Button, Chip, Divider, FormControl, FormHelperText, InputBase,  InputLabel,  MenuItem,  NativeSelect, OutlinedInput, Select, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Box, Container } from '@mui/system';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import validator from 'validator' 
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { PUT_SUBJECT } from '../slice/FormSelectedRow/SubjectSelected';
import { basedUrl } from '../base-url/based-url';
import { useTheme } from '@mui/material/styles';

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




export function SubjectView(){

  const theme = useTheme();
  //dispatch from redux
  const dispatch = useDispatch();

    //Selected Subject
const subject = useSelector(state => state.subjectSelected.value);

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


//Get all active course
const [courseName, setCourseName] = useState([]);

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
    if(validContact && validFname && validLname && validAddress){
      const data = new FormData(event.target);
      data.append('Status', subject.status);
      data.append('Subject_Code', subject.subject_code);
      data.append('Action', 'Update');
      data.append('EditorPosition', user.position);
      data.append('EditorEmail', user.email);
      data.append('Category', 'subject');
    //   for (var pair of data.entries()) {
    //     console.log(pair[0]+ ' - ' + pair[1]); 
    // }
      try{
        setisLoading(true);
        //online api
          const sendRequest = await fetch(basedUrl+"/subject-update.php",{
              method: "POST",
              body: data,
          });
          
          const getResponse = await sendRequest.json();
          console.log(getResponse.statusCode)
          if(getResponse.statusCode !== 201){
            dispatch(PUT_SUBJECT(getResponse.statusCode));
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
        // setMessage(e);
      }
    }else{
      setOpen(true);
      setStatus("warning");
      setMessage("Please check your inputs and try again")
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

 useEffect(() => {
  if(courses.data === []){
    setUpdateCourse(true)
  }
 }, [courses]);
  
    return(
        <>
             <Paper elevation={1} style={{ backgroundImage:`url("https://gstatic.com/classroom/themes/img_graduation.jpg")`,  backgroundRepeat:'no-repeat', backgroundSize: 'cover', }} sx ={{width:'500', paddingTop:'1.5rem'}} className ="rounded-xl">
             <Box component="span" sx={{marginTop: '5.5rem', p: 3, display: 'flex' ,flexDirection:'column', alignItems: 'right'}}>
             <article className="prose lg:prose-xl">
  <h2 className=' text-slate-100' >{subject.subject_code} - {subject.subject_name}</h2>
  <p className=' text-slate-100'>{subject.course_available}</p>
</article>
            </Box>
             </Paper >
             <Paper elevation={1} sx ={{width:'500 ', padding:'1.5rem',marginTop:'1.5rem'}} className ="rounded-xl">
              <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
        
        <Grid2 container sx ={{paddingRight: 10,}} >
            <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
            <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Subject Code:  </Typography>
          <FormControl >
             <TextField disabled defaultValue = {subject.subject_code} name ="Subject_Code" id="Subject_Code" sx={{fontSize:'15px' , width: '50rem'}} variant="standard" inputProps={{ 'aria-label': 'description' }} />
          </FormControl>
         </Stack>   

         <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
            <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Subject Name:  </Typography>
          <FormControl error ={errorSubjectName} >
           <TextField error ={errorSubjectName} defaultValue = {subject.subject_name} name ="Subject_Name" id="Subject_Name" sx={{fontSize:'15px' , width: '50rem'}} onChange ={
              (event) => {
              if((event.target.value).toString().length >0){
               setErrorSubjectName(false);
             }else{
                setErrorSubjectName(true);
             }}} 
          variant="standard" inputProps={{ 'aria-label': 'description' }} />
        {errorSubjectName === true ? (<FormHelperText id="component-helper-text">Subject name must not be empty
        </FormHelperText>): (<></>)}
          </FormControl>
         </Stack>  
         
         <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
            <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Units:  </Typography>
          <FormControl error ={errorUnits}  >
           <TextField error ={errorUnits} type ="number" defaultValue = {subject.units} name ="Units" id="Units" sx={{fontSize:'15px' , width: '50rem'}} onChange ={
              (event) => {
              if(parseFloat(event.target.value) > 0){
               setErrorUnits(false);
             }else{
                setErrorUnits(true);
             }}} 
          variant="standard" inputProps={{ 'aria-label': 'description' }} />
        {errorUnits === true ? (<FormHelperText id="component-helper-text">Units must be greater than 0
        </FormHelperText>): (<></>)}
          </FormControl>
         </Stack>  

        <Stack direction="row" spacing={2} sx = {{width:'100%', marginBottom: '1.5rem'}}>
         <Typography variant ="overline" noWrap sx={{fontSize:'15px', width: '15rem'}}>Courses:  </Typography>

         <FormControl fullWidth variant = "standard" error = {errorCourse}   sx={{fontSize:'15px' , width: '50rem'}}>
        {/* <InputLabel id="demo-multiple-chip-label">Course(s) Available</InputLabel> */}
        <Select
         required
          labelId="demo-multiple-chip-label"
          id="Courses"
          name ="Courses"
          multiple
          value={courseName}
         
          onChange={
            (event) => {
              const {
                target: { value },
              } = event;
              setCourseName(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
              );
              setErrorCourse(false);
            }
          }
          // input={<OutlinedInput id="select-multiple-chip" label="Course(s) Available" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {courses.data.map((name) => (
            <MenuItem
              key={name.id}
              value={name.course_name}
              style={getStyles(name.course_name, courseName, theme)}
            >
              {name.course_name}
            </MenuItem>
          ))}
        </Select>
        {errorCourse=== true ? (<FormHelperText id="helper-text-course">Course available must not be empty
        </FormHelperText>): (<></>)}
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
  
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity= {loginStatus} sx={{ width: '100%' }}>
                {loginMessage}
             </Alert>
       </Snackbar>
       </>
    )
}