import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import { Alert, Container, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CLOSEFORM } from '../slice/AddFormSlice/AddCourseSlice/AddCourseSlice';
import { basedUrl } from '../base-url/based-url';

export function AddCourse(props){
  const [scroll, setScroll] = useState('paper');
 //dispatch from redux
 const dispatch = useDispatch();

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));


  const [errorCourseName, setErrorCourseName] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorFaculty, setErrorFaculty] = useState('');
  const [activeFaculty, setActiveFaculty] = useState(props.faculties);
  
 
 //Open add form
const  formOpenType = useSelector(state => state.addFormCourse.value);
console.log('course' + formOpenType)
//Snackbar
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => {setSnackbar(null)};
  

  const handleChangeCourse = async (event) =>{

    try{
      const data = new FormData();
      data.append('Course_Name', event.target.value);
      const sendRequest = await fetch(basedUrl+"/exist-course-name.php",{
        method: "POST",
        body: data,
    });

    const getResponse = await sendRequest.json();
    console.log(getResponse.statusCode)
    if(getResponse.statusCode === 200){
      setErrorCourseName(false);
     
    }else{
      setErrorCourseName(true);
     
    }
    }catch(e){
      setErrorCourseName(true);
     
  } 
}



  const handleChangeFaculty = (event) =>{
    if((event.target.value).toString().length >0){
        setErrorFaculty(false)
      }else{
        setErrorFaculty(true)
      }
}

  const handleChangeDescription = (event) =>{
    if((event.target.value).toString().length >0){
      setErrorDescription(false)
    }else{
      setErrorDescription(true)
    }
  }

 
  const handleClose = () => {
   dispatch(CLOSEFORM());
   };
 
   const descriptionElementRef = useRef(null);
   useEffect(() => {
    if (formOpenType === 'course') {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [formOpenType]);
 
const handleSubmitForm = async (event) =>{
 
//`action`,`category`,`editor_position`,`editor_email`,`edited_email`
  event.preventDefault();
  if(!errorCourseName && !errorDescription && !errorFaculty){
  const data = new FormData(event.currentTarget);
  data.append('Action', 'Create');
  data.append('EditorPosition', user.position);
  data.append('EditorEmail', user.email);
  data.append('Category', 'Course');

  try{
    const sendRequest = await fetch(basedUrl+"/course-add.php",{
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
        open={formOpenType === 'course'}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

        <DialogTitle id="scroll-dialog-title">Add Course</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddCourse"  onSubmit={handleSubmitForm} nowrap>
    
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>

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
    {console.log(activeFaculty)}
    {activeFaculty.map((faculty) => <MenuItem key = {faculty} value ={faculty.faculty_name}>{faculty.faculty_name}</MenuItem>)}
   </Select>
   </FormControl>
     </Grid2>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorCourseName} name ="Course"  required label="Course" variant="outlined" onKeyUp =  {handleChangeCourse} />
        {errorCourseName === true ? (<FormHelperText id="component-helper-text">Course already exist
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorDescription} name ="Description" fullWidth required label="Description" variant="outlined" onKeyUp =  {handleChangeDescription} />
        {errorDescription === true ? (<FormHelperText id="component-helper-text">Description must not be empty (It can be anything that describe the faculty)
        </FormHelperText>): (<></>)}
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

