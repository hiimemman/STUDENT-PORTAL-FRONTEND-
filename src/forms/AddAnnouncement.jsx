import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import { Alert, Container, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField, Typography, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { CLOSEANNOUNCEMENTFORM } from '../slice/AddFormSlice/AddAnnouncementSlice/AddAnnouncementSlice';
import { basedUrl } from '../base-url/based-url';
import { useTheme } from '@mui/material/styles';
import UploadWidget from '../component/UploadWidget';
import FileUpload from "react-mui-fileuploader"


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



export function AddAnnouncement(props){
  const [scroll, setScroll] = useState('paper');
 //dispatch from redux
 const dispatch = useDispatch();

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));


  const [courseName, setCourseName] = useState([]);
  const [subjectType, setSubjectType] = useState('Minor');




  const [errorSubName, setErrorSubName] = useState('');
  const [errorUnits, setErrorUnits] = useState('');
  const [errorCourse, setErrorCourse] = useState('');
  const [errorYear, setErrorYear] =  useState('');
  const [errorSemester, setErrorSemester] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const [errorAcademicYear, setErrorAcademicYear] = useState('')

  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [academicYear, setAcademicYear] = useState(null);

  const [announcementImageUrl, setAnnouncementImageurl] = useState('No image selected');

  //Open add form
const  formOpenType = useSelector(state => state.addFormAnnouncement.value);

//Snackbar
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => {
    setStartYear(startYear => startYear = null);
    setEndYear(endYear => endYear = null);
    setSnackbar(null)};



 

  const handleChangeSubName = (event) =>{
    if((event.target.value).toString().length >0){
      setErrorSubName(false)
    }else{
      setErrorSubName(true)
    }
  }

  const handleChangeUnits = (event) =>{
    if(parseFloat(event.target.value)  > 0){
      setErrorUnits(false)
    }else{
      setErrorUnits(true)
    }
  }
  const theme = useTheme();
  

  const handleChangeCourse = (event) => {
    const {
      target: { value },
    } = event;
    setCourseName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setErrorCourse(false);
  };

  //Check if courseName is empty
  useEffect(()=>{
    if(courseName.length < 1 && errorCourse !== ''){
      setErrorCourse(true)
    }else{
      setErrorCourse(false)
    }
  },[courseName])

  const handleChangeYear = (event) =>{
    if((event.target.value).toString().length >0){
      setErrorYear(false)
    }else{
      setErrorYear(true)
    }
  }

  const handleChangeSemester = (event) =>{
    if((event.target.value).toString().length >0){
      setErrorSemester(false)
    }else{
      setErrorSemester(true)
    }
  }

  const handleClose = () => {
    setCourseName([]);
    setErrorCourse('')
   dispatch(CLOSEANNOUNCEMENTFORM());
  };
 
   const descriptionElementRef = useRef(null);

  
useEffect(() => {
  if (formOpenType === 'announcement') {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }
 
}, [formOpenType]);
 
const handleSubmitForm = async (event) =>{
 console.log("nagcall dito")
//`action`,`category`,`editor_position`,`editor_email`,`edited_email`
  event.preventDefault();
  if(errorTitle !== null && errorMessage !== null){
    const data = new FormData(event.currentTarget);
  data.append('ImageUrl', announcementImageUrl);
  data.append('Action', 'Create');
  data.append('EditorPosition', user.position);
  data.append('EditorEmail', user.email);
  data.append('Category', 'Announcement');
  console.log("Formdata values:")

  for (var pair of data.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
}
  try{
    const sendRequest = await fetch(basedUrl+"/announcement-add.php",{
              method: "POST",
              body: data,
          });

          const getResponse = await sendRequest.json();
         console.log(getResponse.statusCode)
          if(getResponse.statusCode === 200){
            setSnackbar({ children: 'Update successfully', severity: 'success' });
            dispatch(CLOSEANNOUNCEMENTFORM())
          }else{
            setSnackbar({ children: "Field can't be empty", severity: 'error' });
          }
  }catch(e){
    
    setSnackbar({ children: "Field can't be empty", severity: 'error' });
  }
  }else{
    // setSnackbar({ children: "Field can't be empty", severity: 'error' });
  }
}
 




useEffect(() =>{
  console.log(startYear)
  if(startYear !== null &&  endYear !== null){
    setAcademicYear((academicYear) => academicYear = startYear.toString().substr(12, 4)+" - "+endYear.toString().substr(12, 4));
  }
  return () => {}
},[startYear])


useEffect(() =>{
  console.log(endYear)
  if(startYear !== null &&  endYear !== null){
    setAcademicYear((academicYear) => academicYear = startYear.toString().substr(12, 4)+" - "+endYear.toString().substr(12, 4));
  }
  return () => {}
},[endYear])


const checkAcademicYear = async () =>{

  try{
    const data = new FormData();
    data.append('AcademicYear', academicYear);
    const sendRequest = await fetch(basedUrl+"/exist-academic-year.php",{
      method: "POST",
      body: data,
  });

  const getResponse = await sendRequest.json();
  console.log(getResponse.statusCode)
  if(getResponse.statusCode === 200){
    setErrorAcademicYear(errorAcademicYear => errorAcademicYear = false);
   
  }else{
    setErrorAcademicYear(errorAcademicYear => errorAcademicYear =  true);
   
  }
  }catch(e){
    setErrorAcademicYear(errorAcademicYear => errorAcademicYear = true);
   
}
}

useEffect(() =>{
  checkAcademicYear();
return () =>{

}
},[academicYear])

useEffect(() =>{
console.log(errorAcademicYear)
return () => {}
},[errorAcademicYear])




const handleFileUploadError = (error) => {

  // Do something...
}

const handleFilesChange = async (files) => {
  // Do something...

  try{
    const data = new FormData();
    // data.append('AcademicYear', academicYear);
    data.append('Image', files[0])
    
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/quickstart.php",{
      method: "POST",
      body: data,
  });

  const getResponse = await sendRequest.json();
  console.log(getResponse.statusCode)
  if(getResponse.statusCode === 200){
 
   
  }else{
  
  }
  }catch(e){
  
   
}
}

const handleImageLoad = (event) =>{
setAnnouncementImageurl(announcementImageUrl => announcementImageUrl = event.target.currentSrc)
}

useEffect(() =>{
 
  return () =>{}
},[announcementImageUrl])


const handleChangeTitle = (event) =>{
  if(event.target.value.toString().length  > 0){
    setErrorTitle(errorTitle => errorTitle = false)
  }else{
    setErrorTitle(errorTitle => errorTitle = true)
  }
}

const handleChangeMessage = (event) =>{
  if(event.target.value.toString().length  > 0){
    setErrorMessage(errorMessage => errorMessage = false)
  }else{
    setErrorMessage(errorMessage => errorMessage = true)
  }
}

useEffect(() =>{

  return () =>{}
},[errorMessage])

useEffect(() =>{

  return () =>{}
},[errorTitle])
  return(
    <>
      <Dialog
        open={formOpenType === 'announcement'}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >

        <DialogTitle id="scroll-dialog-title">Add Announcement</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddSubject"  onSubmit={handleSubmitForm} nowrap>
      <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}> 
     
      
      <Grid2 item xs={12}>
        <Stack direction ="column" spacing ={2}>
        <Typography variant ="body">Message image</Typography>
    <img id="uploadedimage" src="" onLoad={handleImageLoad} style ={{maxWidth:'1000px', maxHeight:'300px'}} ></img>
        </Stack>
    <Stack direction ="row" spacing = {2} > 
   <UploadWidget  />
   <Typography variant ="body" id = 'ImageFileNameXD' body ="asd"  ></Typography>
    </Stack>
    </Grid2>

   
    <Grid2 item xs={12} fullWidth>
              <FormControl fullWidth error ={errorTitle}>
               <TextField error = {errorTitle} name ="Title" fullWidth required label="Title" variant="outlined" onKeyUp =  {handleChangeTitle} />
        {errorTitle === true ? (<FormHelperText id="component-helper-text">Title must not be empty
        </FormHelperText>): (<></>)}
               </FormControl>
    </Grid2>

    <Grid2 item xs={12} fullWidth>
             <FormControl fullWidth  required>
              <InputLabel required id="demo-simple-select-label">Category</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name = "Category"
                label="Category"
                >
                <MenuItem value ={'Announcement'}>Announcement</MenuItem>
                <MenuItem value ={'News and Updates'}>News and Updates</MenuItem>
              </Select>
            </FormControl>
           
      </Grid2>

      <Grid2 item xs={12} fullWidth>
              <FormControl fullWidth error ={errorMessage}>
               <TextField error = {errorMessage} name ="Message" fullWidth required label="Message" variant="outlined" onKeyUp =  {handleChangeMessage} />
        {errorMessage === true ? (<FormHelperText id="component-helper-text">Message must not be empty
        </FormHelperText>): (<></>)}
               </FormControl>
    </Grid2>

    
    </Grid2>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form ="frmAddSubject">SUBMIT</Button>
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

