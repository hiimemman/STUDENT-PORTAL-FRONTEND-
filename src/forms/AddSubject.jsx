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
import { CLOSESUBFORM } from '../slice/AddFormSlice/AddSubjectSlice/AddSubjectSlice';
import { basedUrl } from '../base-url/based-url';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

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


export function AddSubject(props){
  const [scroll, setScroll] = useState('paper');
 //dispatch from redux
 const dispatch = useDispatch();

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));


  const [courseName, setCourseName] = useState([]);



  const [errorSubjectCode, setErrorSubjectCode] = useState('');
  const [errorSubName, setErrorSubName] = useState('');
  const [errorUnits, setErrorUnits] = useState('');
  const [errorCourse, setErrorCourse] = useState('');
  const [errorYear, setErrorYear] =  useState('');
  const [errorSemester, setErrorSemester] = useState('');


  //Open add form
const  formOpenType = useSelector(state => state.addFormSub.value);

//Snackbar
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const [courses, setCourses] = useState(props.course);

 console.log(courses)

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
   dispatch(CLOSESUBFORM());
  };
 
   const descriptionElementRef = useRef(null);

  
useEffect(() => {
  if (formOpenType === 'subject') {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }
 
}, [formOpenType]);
 
const handleSubmitForm = async (event) =>{
 
//`action`,`category`,`editor_position`,`editor_email`,`edited_email`
  event.preventDefault();
  if(!errorSubjectCode && !errorSubName && !errorUnits){
  const data = new FormData(event.currentTarget);
  data.append('Action', 'Create');
  data.append('EditorPosition', user.position);
  data.append('EditorEmail', user.email);
  data.append('Category', 'Subject');
  console.log("Formdata values:")

  for (var pair of data.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
}
  try{
    const sendRequest = await fetch(basedUrl+"/subject-add.php",{
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
  }else{
    setSnackbar({ children: "Field can't be empty", severity: 'error' });
  }
}
 


  return(
    <>
    {console.log("Add subject renderd")}
      <Dialog
        open={formOpenType === 'subject'}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

        <DialogTitle id="scroll-dialog-title">Add Subject</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddSubject"  onSubmit={handleSubmitForm} nowrap>
    
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorSubjectCode} name ="Subject_Code"  required label="Subject Code" variant="outlined" onKeyUp =  {handleChangeSubCode} />
        {errorSubjectCode === true ? (<FormHelperText id="component-helper-text">Subject code already exist
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorSubName} name ="Subject_Name" fullWidth required label="Subject Name" variant="outlined" onKeyUp =  {handleChangeSubName} />
        {errorSubName === true ? (<FormHelperText id="component-helper-text">Subject name must not be empty
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorUnits} type ="number" name ="Units" fullWidth required label="Units" variant="outlined" onKeyUp =  {handleChangeUnits} />
        {errorUnits === true ? (<FormHelperText id="component-helper-text">Units name must not be empty
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2>
             <Grid2 item xs={12}>
        <FormControl fullWidth error = {errorCourse}>
        <InputLabel id="demo-multiple-chip-label">Course(s) Available</InputLabel>
        <Select
        required
          labelId="demo-multiple-chip-label"
          id="Courses"
          name ="Courses"
          multiple
          value={courseName}
          onChange={handleChangeCourse}
          input={<OutlinedInput id="select-multiple-chip" label="Course(s) Available" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {courses.map((name) => (
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
             </Grid2>

             <Grid2 item xs={12}>
             <FormControl fullWidth error = {errorYear} required>
              <InputLabel id="demo-simple-select-label">Year Available</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name = "Year_Available"
                label="Year Available"
                defaultValue ={''}
                onChange={handleChangeYear}
                >
                <MenuItem value={'1st year'}>1st year</MenuItem>
                <MenuItem value={'2nd year'}>2nd year</MenuItem>
                <MenuItem value={'3rd year'}>3rd year</MenuItem>
                <MenuItem value={'4th year'}>4th year</MenuItem>
                <MenuItem value={'5th year'}>5th year</MenuItem>
                <MenuItem value={'6th year'}>6th year</MenuItem>
              </Select>
            </FormControl>
            </Grid2>

            <Grid2 item xs={12}>
             <FormControl fullWidth error = {errorSemester} required>
              <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name = "Semester"
                label="Semester"
                defaultValue= {''}
                onChange={handleChangeSemester}
                >
                <MenuItem value={'1st semester'}>1st semester</MenuItem>
                <MenuItem value={'2nd semester'}>2nd semester</MenuItem>
              </Select>
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