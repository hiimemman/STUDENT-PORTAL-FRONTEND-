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
import { CLOSEFORM } from '../slice/AddFormSlice/AddStudentSlice/AddStudentSlice';
import { basedUrl } from '../base-url/based-url';
import validator from 'validator'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

export function AddStudent(props){
  const [scroll, setScroll] = useState('paper');

 //dispatch from redux
 const dispatch = useDispatch();

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

  //error states
  const [errorStudentNumber, setErrorStudentNumber] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorMiddleName, setErrorMiddleName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorProfessorUsername, setErrorProfileUsername] = useState(''); 
  const [errorFaculty, setErrorFaculty] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const [errorCourse, setErrorCourse] = useState('');
  const [errorSection, setErrorSection] = useState('');
  const [errorContact, setErrorContact] = useState('');
  //error message
  const [emailHelpertext, setEmailHelperText] = useState('');
  const [usernameHelpertext, setUsernameHelpertext] = useState('');
  const [studentNumberHelpertext, setStudentNumberHelpertext] = useState('');
  const [addressHelperText, setAddressHelpertext] = useState('');
  const [contactHelperText, setContactHelpertext] = useState('');
  //states
  const [activeFaculty, setActiveFaculty] = useState(props.faculty);
  const [activeCourse, setActiveCourse] = useState(props.courses.data);
  const [activeSection, setActiveSection] = useState(props.sections.data);

  //selected states
  const [selectedCourse, setSelectedCourse] = useState('');
 //Open add form
const  formOpenType = useSelector(state => state.addFormStudent.value);

//pre define state
const [studentNumber, setStudentNumber] = useState(props.currentYear +""+props.fourDigits);

//calendar default value
const [birthDay, setbirthDay] = useState(null);

//Snackbar
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => {setSnackbar(null)};

  const handleChangeSection = (event) =>{
    if((event.target.value).toString().length >0){
        setErrorSection(false)
      }else{
        setErrorSection(true)
      }
}

useEffect(() =>{
let isCancelled = false;

return ()=> {isCancelled = true}
},[errorSection])

const handleChangeCourse = (event) =>{
    if((event.target.value).toString().length >0){
      
        setErrorCourse((errorCourse) => errorCourse =false)
      }else{
        setErrorCourse((errorCourse) => errorCourse = false)
      }
      setSelectedCourse((selectedCourse) => selectedCourse = event.target.value)
}

useEffect(() =>{
  let isCancelled = false;
  
  return ()=> {isCancelled = true}
  },[errorCourse])

  
useEffect(() =>{
  let isCancelled = false;
  
  return ()=> {isCancelled = true}
},[selectedCourse])


const handleChangeBday = (event) =>{
  setbirthDay((birthDay) => birthDay = event);
}

useEffect(() =>{
let isCancelled = false

return () =>{isCancelled = true}
},[birthDay])


 
  const handleClose = () => {
   dispatch(CLOSEFORM());
   };
 
   const descriptionElementRef = useRef(null);
   useEffect(() => {
    if (formOpenType === 'student') {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [formOpenType]);
 
  



//event change handlers

const handleChangeStudentnumber = async (event) =>{
    if((event.target.value).toString().length !== 6 ){
      setErrorStudentNumber((prev) => prev = true);

    }else{
      try{
        const data = new FormData();
        data.append('StudentNumber', event.target.value);
        const sendRequest = await fetch(basedUrl+"/exist-student-number.php",{
          method: "POST",
          body: data,
      });
      
      for (var pair of data.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
      }
      const getResponse = await sendRequest.json();

      if(getResponse.statusCode === 200){
        setErrorStudentNumber((prev) => prev = false);
      }else{
        setErrorStudentNumber((prev) => prev = true);
        setStudentNumberHelpertext((prev) => prev = "Student number already exist!")
      }
      }catch(e){
        setErrorStudentNumber((prev) => prev = true);
        setStudentNumberHelpertext('Server problem!');
      }  
    } 
  }

const handleChangeFirstname = (event) =>{
  if((event.target.value).toString().length > 0){
    setErrorFirstName((prev) => prev = false);
  }else{
    setErrorFirstName((prev) => prev = true);
  } 
}


useEffect(() =>{
let isCancelled = false;

return () => {isCancelled = true}
},[errorStudentNumber, studentNumberHelpertext]);


const handleChangeLastName = (event) =>{
  if((event.target.value).toString().length > 0){
    setErrorLastName((prev) => prev = false);
  }else{
    setErrorLastName((prev) => prev = true);
  } 
}

const handleChangeContact = async (event) =>{
  const isValidPhoneNumber = validator.isMobilePhone(event.target.value)
  if(!isValidPhoneNumber || (event.target.value).toString().length !== 11){
    setErrorContact((prev) => prev = true);
    setContactHelpertext((prev) => prev = "Invalid Contact number")
  }else{
    try{
      const data = new FormData();
      data.append('Contact', event.target.value);
      const sendRequest = await fetch(basedUrl+"/exist-student-contact.php",{
        method: "POST",
        body: data,
    });

    const getResponse = await sendRequest.json();
    if(getResponse.statusCode === 200){
      setErrorContact((prev) => prev = false);
    }else{
      setErrorContact((prev) => prev = true);
      setContactHelpertext((prev) => prev = "Contact number already exist!")
    }
    }catch(e){
      setErrorContact((prev) => prev = true);
      setEmailHelperText('Server problem!');
    }  
  }
}

useEffect(() =>{
let isCancelled = false;

return () =>{
  isCancelled = true;
}
},[errorContact, contactHelperText])

const handleChangeEmail = async (event) =>{
  if(!validator.isEmail(event.target.value)){
    setErrorEmail((prev) => prev = true);
    setEmailHelperText((prev) => prev = "Invalid Email address")
  }else{
    try{
      const data = new FormData();
      data.append('Email', event.target.value);
      const sendRequest = await fetch(basedUrl+"/exist-student-email.php",{
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

const handleChangeAddress = (event) =>{
  if((event.target.value).toString().length > 0){
    setErrorAddress((prev) => prev = false);
  }else{
    setErrorAddress((prev) => prev = true);
    setAddressHelpertext((prev)=> prev ='Address must not be empty')
  } 
}

useEffect( () => {
//Input label listener

  return () =>{
    //exit in memory
  }
},[errorStudentNumber, errorFirstName, errorLastName, errorEmail, errorAddress]);
 
useEffect (() => {
//helper text listener

}, [emailHelpertext, usernameHelpertext, errorProfessorUsername ]);



const handleSubmitForm = async (event) =>{
 
  //`action`,`category`,`editor_position`,`editor_email`,`edited_email`
    event.preventDefault();
    if(!errorFirstName && !errorLastName && !errorEmail && !errorProfessorUsername && !errorFaculty){
    const randomPassword =
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const data = new FormData(event.currentTarget);
    data.append('Password', randomPassword);
    data.append('Birthday', birthDay);
    data.append('Action', 'Create');
    data.append('EditorPosition', user.position);
    data.append('EditorEmail', user.email);
    data.append('Category', 'Student');

    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
  
    try{
      const sendRequest = await fetch(basedUrl+"/student-add.php",{
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
      console.log(e)
      setSnackbar({ children: "Field can't be empty", severity: 'error' });
    }
    }else{
      setSnackbar({ children: "Field can't be empty", severity: 'error' });
    }
  }

 
  return(
    <>
      <Dialog
        open={formOpenType === 'student'}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
     
        <DialogTitle id="scroll-dialog-title">Add Student</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddCourse"  onSubmit={handleSubmitForm} nowrap>
    
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>

        <Grid2 item xs={12}>
           <FormControl fullWidth error = {errorStudentNumber} required>
               <InputLabel htmlFor="StudentNumber">Student Number</InputLabel>
               <OutlinedInput name ="StudentNumber" defaultValue={studentNumber} id ="StudentNumber" type ="number" required label = "Student Number" onChange ={handleChangeStudentnumber} />
               {errorStudentNumber === true ? (<FormHelperText id="component-error-text" >{studentNumberHelpertext}</FormHelperText>) : (<></>)}
           </FormControl>
        </Grid2>  

        <Grid2 item xs={12}>
           <FormControl fullWidth error = {errorFirstName} required>
               <InputLabel htmlFor="FirstName">First name</InputLabel>
               <OutlinedInput name ="FirstName" id ="FirstName" required label = "First name" onChange ={handleChangeFirstname} />
               {errorFirstName === true ? (<FormHelperText id="component-error-text" >First name must not be empty</FormHelperText>) : (<></>)}
           </FormControl>
        </Grid2>  

        <Grid2 item xs={12}>
              <FormControl fullWidth >
              <InputLabel htmlFor="MiddleName">Middle name</InputLabel>
               <OutlinedInput name ="MiddleName" id ="MiddleName"  label = "Middle name" />
               </FormControl>
        </Grid2>

        <Grid2 item xs={12}>
              <FormControl fullWidth required error ={errorLastName}>
                <InputLabel htmlFor="LastName">Last name</InputLabel>
                <OutlinedInput name ="LastName" id ="LastName" required label = "Last name" onChange={handleChangeLastName} />
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
              <FormControl fullWidth required error = {errorContact}>
                  <InputLabel htmlFor="Contact">Contact</InputLabel>
                  <OutlinedInput name ="Contact" id ="Contact" type ="number" required label = "Contact" onChange = {handleChangeContact} />
                  {errorContact === true ? (<FormHelperText id="component-error-text" >{contactHelperText}</FormHelperText>) : (<></>)}
               </FormControl>
        </Grid2>

        <Grid2 item xs={12}>
    <FormControl fullWidth required>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
          required
          label ="Date of Birth"
          inputFormat="MM/DD/YYYY"
          value={birthDay}
          onChange={handleChangeBday}
          renderInput={(params) => <TextField autoComplete='off' {...params} />}
        />
        </LocalizationProvider>
        </FormControl>
  </Grid2>

        <Grid2 item xs={12}>
              <FormControl fullWidth required error = {errorAddress}>
                  <InputLabel htmlFor="Address">Address</InputLabel>
                  <OutlinedInput name ="Address" id ="Address" required label = "Address" onChange = {handleChangeAddress} />
                  {errorAddress === true ? (<FormHelperText id="component-error-text" >{addressHelperText}</FormHelperText>) : (<></>)}
               </FormControl>
        </Grid2> 
        <Grid2 item xs={12}>
             <FormControl fullWidth  required>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name = "Type"
                label="Type"
                defaultValue ={''}
                >
                <MenuItem value={'Regular'}>Regular</MenuItem>
                <MenuItem value={'Irregular'}>Irregular</MenuItem>
              </Select>
            </FormControl>
  </Grid2>
        
  <Grid2 item xs={12}>
    <FormControl fullWidth error ={errorCourse}>
         <InputLabel id="demo-simple-select-label">Course*</InputLabel>
     <Select
     required
     labelId="demo-simple-select-label"
     id="demo-simple-select"
     name = "Course"
     label="Course"
     onChange={handleChangeCourse}
   >
    {activeCourse.map((course) => <MenuItem key = {course.id} value ={course.course_name}>{course.course_name}</MenuItem>)}
   </Select>
   </FormControl>
  </Grid2>

  <Grid2 item xs={12}>
    <FormControl fullWidth error ={errorSection}>
  
      <InputLabel id="demo-simple-select-label">Section*</InputLabel>
          <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name = "Section"
          label="Section"
          onChange={handleChangeSection}
        >
         
       {activeSection.filter(section => {
          return section.course === selectedCourse;
        }).map((section) =><MenuItem key = {section.id} value = {section.sectionandacademicyear} >{section.section_name}</MenuItem>)}
        
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

