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
import { CLOSESECTIONFORM } from '../slice/AddFormSlice/AddSectionSlice/AddSectionSlice';
import { basedUrl } from '../base-url/based-url';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';


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


export function AddSection(props){
  const [scroll, setScroll] = useState('paper');
 //dispatch from redux
 const dispatch = useDispatch();

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));


  const [courseName, setCourseName] = useState([]);
  const [subjectType, setSubjectType] = useState('Minor');

 

  const [errorSubjectCode, setErrorSubjectCode] = useState('');
  const [errorSubName, setErrorSubName] = useState('');
  const [errorUnits, setErrorUnits] = useState('');
  const [errorCourse, setErrorCourse] = useState('');
  const [errorYear, setErrorYear] =  useState('');
  const [errorSemester, setErrorSemester] = useState('');
  const [errorType, setErrorType] = useState('');

  const [courses, setCourses] = useState(props.courses.data);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [academicYear, setAcademicYear] = useState(null);
  

  //Open add form
const  formOpenType = useSelector(state => state.addFormSection.value);

//Snackbar
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleChangeSubCode = async (event) =>{

    try{
      const data = new FormData();
      data.append('Subject_Code', event.target.value);
      const sendRequest = await fetch(basedUrl+"/exist-subject-code.php",{
        method: "POST",
        body: data,
    });

    const getResponse = await sendRequest.json();
    console.log(getResponse.statusCode)
    if(getResponse.statusCode === 200){
      setErrorSubjectCode(false);
     
    }else{
      setErrorSubjectCode(true);
     
    }
    }catch(e){
      setErrorSubjectCode(true);
     
  }
}

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
  
 

  //Check if courseName is empty
  useEffect(()=>{
    if(courseName.length < 1 && errorCourse !== ''){
      setErrorCourse(true)
    }else{
      setErrorCourse(false)
    }
  },[courseName])

  

  const handleClose = () => {
    // setCourseName([]);
    // setErrorCourse('')
   dispatch(CLOSESECTIONFORM());
  };
 
   const descriptionElementRef = useRef(null);

  
useEffect(() => {
  if (formOpenType === 'subject') {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }
 return () =>{
  //exit in memory
 }
}, [formOpenType]);

//start and end year listener to produce a school year

useEffect(()=>{
  if(startYear !== null && endYear !== null){
    setAcademicYear(startYear.toString().substr(12, 4)+" - "+endYear.toString().substr(12, 4));
  }
return () =>{
  //exit in memory
 }
},[startYear, endYear])

 
const handleSubmitForm = async (event) =>{
//`action`,`category`,`editor_position`,`editor_email`,`edited_email`
  event.preventDefault();
  
  const data = new FormData(event.currentTarget);

  //specific
  data.append('AcademicYear', academicYear);
  data.append('StartYear', startYear.toString().substr(12, 4));
  data.append('EndYear', endYear.toString().substr(12, 4));
  //const
  data.append('Action', 'Create');
  data.append('EditorPosition', user.position);
  data.append('EditorEmail', user.email);
  data.append('Category', 'Section');
  console.log("Formdata values:")

  for (var pair of data.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
}
  try{
    const sendRequest = await fetch(basedUrl+"/section-add.php",{
              method: "POST",
              body: data,
          });

          const getResponse = await sendRequest.json();
         console.log(getResponse.statusCode)
          if(getResponse.statusCode === 200){
            setSnackbar({ children: 'Update successfully', severity: 'success' });
            dispatch(CLOSESUBFORM())
          }else{
            setSnackbar({ children: "Field can't be empty", severity: 'error' });
          }
  }catch(e){
    
    setSnackbar({ children: "Field can't be empty", severity: 'error' });
  }
 
}
 


  return(
    <>
      <Dialog
        open={formOpenType === 'section'}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >

        <DialogTitle id="scroll-dialog-title">Add Section</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddSubject"  onSubmit={handleSubmitForm} nowrap>
    
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             {/* <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorSubjectCode} name ="Subject_Code"  required label="Subject Code" variant="outlined" onKeyUp =  {handleChangeSubCode} />
        {errorSubjectCode === true ? (<FormHelperText id="component-helper-text">Subject code already exist
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2> */}

             <Grid2 item xs={12}>
             <FormControl fullWidth error = {errorYear} required>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name = "Course"
                label="Course"
                >
                    {console.log("COURSES IN SECTION:" + JSON.stringify(courses))}
              {courses.map((course) => (<MenuItem key = {course.id} value={course.course_name}>{course.course_name}</MenuItem>))}
              </Select>
            </FormControl>
            </Grid2>

            <Grid2 item xs={12}>
             <FormControl fullWidth error = {errorYear} required>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name = "Year"
                label="Year"
                >
                <MenuItem value ={'1st year'}>1st year</MenuItem>
                <MenuItem value ={'2nd year'}>2nd year</MenuItem>
                <MenuItem value ={'3rd year'}>3rd year</MenuItem>
                <MenuItem value ={'4th year'}>4th year</MenuItem>
                <MenuItem value ={'5th year'}>5th year</MenuItem>
                <MenuItem value ={'6th year'}>6th year</MenuItem>
              </Select>
            </FormControl>
            </Grid2>

            <Grid2 item xs={12}>
             <FormControl fullWidth error = {errorYear} required>
              <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name = "Semester"
                label="Semester"
                >
                <MenuItem value ={'1st semester'}>1st semester</MenuItem>
                <MenuItem value ={'2nd semester'}>2nd semester</MenuItem>
              </Select>
            </FormControl>
            </Grid2>

      <Grid2 item xs={12}>
        <FormControl fullWidth required>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
            required
            views={['year']}
            label ="Start of school year"
            id =  "StartYear"
            name = "StartYear"
            onChange = {(event) =>{setStartYear(event); return () =>{}} }
            value={startYear}
           // onChange={handleChangeYear}
           renderInput={(params) => <TextField autoComplete='off' {...params} />}
            />
          </LocalizationProvider>
          </FormControl>
    </Grid2>


    <Grid2 item xs={12}>
        <FormControl fullWidth required>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
            required
            views={['year']}
            label ="End of school year"
            name = "EndYear"
            id = "EndYear"
            value={endYear}
            onChange = {(event) =>{setEndYear(event)} }
           // onChange={handleChangeYear}
           renderInput={(params) => <TextField autoComplete='off' {...params} />}
            />
          </LocalizationProvider>
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