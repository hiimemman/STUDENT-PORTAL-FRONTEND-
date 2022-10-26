import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import { OutlinedInput, Alert, Container, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField, Typography, FormHelperText } from '@mui/material';
import { Box } from '@mui/system';
import { CLOSEFORM } from '../slice/AddFormSlice/AddProfessorSlice/AddProfessorSlice';
import { basedUrl } from '../base-url/based-url';
import validator from 'validator'

export function AddProfessor(props){
  const [scroll, setScroll] = useState('paper');
 //dispatch from redux
 const dispatch = useDispatch();

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

  //error states
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorMiddleName, setErrorMiddleName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorProfessorUsername, setErrorProfileUsername] = useState(''); 
  const [errorFaculty, setErrorFaculty] = useState('');

  //error message
  const [emailHelpertext, setEmailHelperText] = useState('');
  const [usernameHelpertext, setUsernameHelpertext] = useState('');

  //states
  const [activeFaculty, setActiveFaculty] = useState(props.faculty);
  
 
 //Open add form
const  formOpenType = useSelector(state => state.addFormProfessor.value);

//Snackbar
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => {setSnackbar(null)};
  

  const handleChangeFaculty = (event) =>{
    if((event.target.value).toString().length >0){
        setErrorFaculty(false)
      }else{
        setErrorFaculty(true)
      }
}

 
  const handleClose = () => {
   dispatch(CLOSEFORM());
   };
 
   const descriptionElementRef = useRef(null);
   useEffect(() => {
    if (formOpenType === 'professor') {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [formOpenType]);
 



//event change handlers

const handleChangeFirstname = (event) =>{
  if((event.target.value).toString().length > 0){
    setErrorFirstName((prev) => prev = false);
  }else{
    setErrorFirstName((prev) => prev = true);
  } 
}



const handleChangeLastName = (event) =>{
  if((event.target.value).toString().length > 0){
    setErrorLastName((prev) => prev = false);
  }else{
    setErrorLastName((prev) => prev = true);
  } 
}

const handleChangeEmail = async (event) =>{
  if(!validator.isEmail(event.target.value)){
    setErrorEmail((prev) => prev = true);
    setEmailHelperText((prev) => prev = "Invalid Email address")
  }else{
    try{
      const data = new FormData();
      data.append('Email', event.target.value);
      const sendRequest = await fetch(basedUrl+"/exist-professor-email.php",{
        method: "POST",
        body: data,
    });

    const getResponse = await sendRequest.json();
    if(getResponse.statusCode === 200){
      setErrorEmail((prev) => prev = false);
    }else{
      setErrorEmail((prev) => prev = true);
      setEmailHelperText((prev) => prev = "Email already exist!")
    }
    }catch(e){
      setErrorEmail((prev) => prev = true);
      setEmailHelperText('Server problem!');
    }  
  }
}

const handleChangeProfessorUsername = async (event) =>{

  if((event.target.value).toString().length <= 0 ){
    console.log("pumasok dto")
    setErrorProfileUsername((prev) => prev = true);
    setUsernameHelpertext((prev) => prev = "Username must not be empty");
    return;
  }else{
    try{
      const data = new FormData();
      data.append('ProfessorUsername', event.target.value);
      const sendRequest = await fetch(basedUrl+"/exist-professor-username.php",{
        method: "POST",
        body: data,
    });

    const getResponse = await sendRequest.json();
    if(getResponse.statusCode === 200){
      setErrorProfileUsername((prev) => prev = false);
      return;
    }else{
      setErrorProfileUsername((prev) => prev = true);
      setUsernameHelpertext((prev) => prev = "Username already exist!");
      return;
    }
    }catch(e){
      setErrorProfileUsername((prev) => prev = true);
      setUsernameHelpertext((prev) => prev = "Server problem!");
      return;
    }  
  }
}

useEffect( () => {
//Input label listener

  return () =>{
    //exit in memory
  }
},[errorFirstName, errorLastName, errorEmail]);
 
useEffect (() => {
//helper text listener
console.log(errorProfessorUsername) 
  
}, [emailHelpertext, usernameHelpertext, errorProfessorUsername ]);



const handleSubmitForm = async (event) =>{
 
  //`action`,`category`,`editor_position`,`editor_email`,`edited_email`
    event.preventDefault();
    if(!errorFirstName && !errorLastName && !errorEmail && !errorProfessorUsername && !errorFaculty){
    const data = new FormData(event.currentTarget);
    data.append('Action', 'Create');
    data.append('EditorPosition', user.position);
    data.append('EditorEmail', user.email);
    data.append('Category', 'Professor');

    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
  
    try{
      const sendRequest = await fetch(basedUrl+"/professor-add.php",{
                method: "POST",
                body: data,
            });
  
            const getResponse = await sendRequest.json();
           console.log(getResponse.statusCode)
            if(getResponse.statusCode === 200){
              setSnackbar({ children: 'Update successfully', severity: 'success' });
              dispatch(CLOSEFORM())
            }else{
              setSnackbar({ children: "Field can't be empty", severity: 'error' });
            }
    }catch(e){
      
      setSnackbar({ children: "Field can't be empty", severity: 'error' });
    }
    }else{
      setSnackbar({ children: "Field can't be empty", severity: 'error' });
    }
  }
  return(
    <>
      <Dialog
        open={formOpenType === 'professor'}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >

        <DialogTitle id="scroll-dialog-title">Add Professor</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddCourse"  onSubmit={handleSubmitForm} nowrap>
    
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>

        <Grid2 item xs={12}>
           <FormControl fullWidth error = {errorFirstName} required>
               <InputLabel htmlFor="Firstname">First name</InputLabel>
               <OutlinedInput name ="Firstname" id ="Firstname" required label = "First name" onChange ={handleChangeFirstname} />
               {errorFirstName === true ? (<FormHelperText id="component-error-text" >First name must not be empty</FormHelperText>) : (<></>)}
           </FormControl>
        </Grid2>  

        <Grid2 item xs={12}>
              <FormControl fullWidth >
              <InputLabel htmlFor="Middlename">Middle name</InputLabel>
               <OutlinedInput name ="Middlename" id ="Middlename"  label = "Middle name" />
               </FormControl>
        </Grid2>

        <Grid2 item xs={12}>
              <FormControl fullWidth required error ={errorLastName}>
                <InputLabel htmlFor="Lastname">Last name</InputLabel>
                <OutlinedInput name ="Lastname" id ="Lastname" required label = "Last name" onChange={handleChangeLastName} />
                {errorLastName === true ? (<FormHelperText id="component-error-text" >Last name must not be empty</FormHelperText>) : (<></>)}
               </FormControl>
        </Grid2>

        <Grid2 item xs={12}>
              <FormControl fullWidth required error = {errorEmail}>
                  <InputLabel htmlFor="Email">Email</InputLabel>
                  <OutlinedInput name ="Email" id ="Email" required label = "Email" onChange = {handleChangeEmail} />
                  {errorEmail === true ? (<FormHelperText id="component-error-text" >{emailHelpertext}</FormHelperText>) : (<></>)}
               </FormControl>
        </Grid2>

        <Grid2 item xs={12}>
              <FormControl fullWidth required error = {errorProfessorUsername}>
                <InputLabel htmlFor="ProfessorUsername">Username</InputLabel>
                <OutlinedInput name ="ProfessorUsername" id ="ProfessorUsername" required label = "Username" onChange ={handleChangeProfessorUsername} />
                {errorProfessorUsername === true ? (<FormHelperText id="component-error-text" >{usernameHelpertext}</FormHelperText>) : (<></>)}
              </FormControl>
        </Grid2>

        <Grid2 item xs={12}>
        <FormControl fullWidth error ={errorFaculty}>
         <InputLabel id="demo-simple-select-label">Faculty*</InputLabel>
     <Select
     required
     labelId="demo-simple-select-label"
     id="demo-simple-select"
     name = "Faculty"
     label="Faculty"
     onChange={handleChangeFaculty}
   >
    {activeFaculty.map((faculty) => <MenuItem key = {faculty} value ={faculty.faculty_name}>{faculty.faculty_name}</MenuItem>)}
   </Select>
   </FormControl>
        </Grid2>
             
        </Grid2>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form ="frmAddCourse">SUBMIT</Button>
        </DialogActions>
      </Dialog>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  )
}

