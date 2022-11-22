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
import { CLOSEACADFORM } from '../slice/AddFormSlice/AddAcademicYearSlice/AddAcademicYear';
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


export function AddAcademicYear(props){
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

  const [errorAcademicYear, setErrorAcademicYear] = useState('')

  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [academicYear, setAcademicYear] = useState(null);


  //Open add form
const  formOpenType = useSelector(state => state.addFormAcademicYear.value);

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
   dispatch(CLOSEACADFORM());
  };
 
   const descriptionElementRef = useRef(null);

  
useEffect(() => {
  if (formOpenType === 'academic year') {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }
 
}, [formOpenType]);
 
const handleSubmitForm = async (event) =>{
 
//`action`,`category`,`editor_position`,`editor_email`,`edited_email`
  event.preventDefault();
  if(!errorAcademicYear && academicYear !== null && endYear !== null && startYear !== null){
    const data = new FormData();
    data.append('AcademicYear', academicYear);
    data.append('StartYear', startYear.toString().substr(12, 4));
    data.append('EndYear', endYear.toString().substr(12, 4));
  data.append('Action', 'Create');
  data.append('EditorPosition', user.position);
  data.append('EditorEmail', user.email);
  data.append('Category', 'AcademicYear');
  console.log("Formdata values:")

  for (var pair of data.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
}
  try{
    const sendRequest = await fetch(basedUrl+"/academic-year-add.php",{
              method: "POST",
              body: data,
          });

          const getResponse = await sendRequest.json();
         console.log(getResponse.statusCode)
          if(getResponse.statusCode === 200){
            setSnackbar({ children: 'Update successfully', severity: 'success' });
            dispatch(CLOSEACADFORM())
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


  return(
    <>
      <Dialog
        open={formOpenType === 'academic year'}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >

        <DialogTitle id="scroll-dialog-title">Add Academic Year</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddSubject"  onSubmit={handleSubmitForm} nowrap>
      <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>

      {academicYear !== null ? (<Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField  name ="AcademicYear"  label = {academicYear} variant="outlined" disabled />
               </FormControl>
    </Grid2>) : (<></>)}
         <Grid2 item xs={12}>
          
        <FormControl fullWidth required error ={errorAcademicYear}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
            required
            views={['year']}
            label ="Start of school year"
            id =  "StartYear"
            name = "StartYear"
            onChange = {(event) =>{setStartYear(startYear => startYear = event)} }
            value={startYear}
            
           // onChange={handleChangeYear}
           renderInput={(params) => <TextField autoComplete='off' required {...params} error ={errorAcademicYear} />}
            />
          </LocalizationProvider>
          {errorAcademicYear === true ? (<FormHelperText >Academic year already exist</FormHelperText>) : null}
          </FormControl>
    </Grid2>


    <Grid2 item xs={12}>
        <FormControl fullWidth required error ={errorAcademicYear}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
            required
            views={['year']}
            label ="End of school year"
            name = "EndYear"
            id = "EndYear"
            value={endYear}
            onChange = {(event) =>{setEndYear(endYear => endYear = event)} }
           // onChange={handleChangeYear}
           renderInput={(params) => <TextField autoComplete='off' required {...params} error  ={errorAcademicYear}  />}
            />
          </LocalizationProvider>
        {errorAcademicYear === true ? (<FormHelperText >Academic year already exist</FormHelperText>) : null}
          
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