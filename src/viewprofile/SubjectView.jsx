import { Alert, Button, Divider, FormControl, FormHelperText, InputBase,  NativeSelect, Snackbar, Stack, TextField, Typography } from '@mui/material';
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

export function SubjectView(){

    //Selected Subject
const subject = useSelector(state => state.subjectSelected.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

  //dispatch from redux
  const dispatch = useDispatch();


//Submit is Loading
const [isLoading, setisLoading] = useState(false);


//Snackbar
const [open, setOpen] = useState(false);// for snackbar

//snackbar status
const [loginStatus, setStatus] = useState("failed");// default is failed for login atttempt alert


//Message of snackbar
const [loginMessage, setMessage ] = useState("Try again");// Default message of alert


//Error handlers

const [errorSubjectName, setErrorSubjectName] = useState('');
const [errorUnits, setErrorUnits] = useState('');



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
          <FormControl error ={errorUnits} >
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