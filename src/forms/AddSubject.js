import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSEFORM } from '../slice/AddFormSlice/AddEmployeeSlice/AddEmployeeSlice';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import { Container, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import validator from 'validator'
import { EventBusyTwoTone } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import {OPENSNACK, CLOSESNACK} from '../slice/Snackbars/EmployeeTableOpen/EmployeeTableOpen';
import {SUCCESSSNACK, FAILEDSNACK} from '../slice/Snackbars/EmployeeTableStatus/EmployeeTableStatus'
import {SUCCESSMESSAGESNACK, FAILEDMESSAGESNACK} from '../slice/Snackbars/EmployeeTableMessage/EmployeeTableMessage'



export function AddSubject(props){
  const [scroll, setScroll] = useState('paper');


//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));
  //dispatch from redux
  const dispatch = useDispatch();

 const [openForm, setOpenForm] = useState(props.open);
  const [validSubjectCode, setValidSubjectCode] = useState('');;

  
  
  const handleChangeEmail = async (event) =>{
    if((event.target.value).toString().length <= 0 || !validator.isEmail(event.target.value)){
      setValidSubjectCode(false);
    }else{
      try{
        const data = new FormData();
        data.append('Email', event.target.value);
        const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/exist-employee-email.php",{
          method: "POST",
          body: data,
      });
  
      const getResponse = await sendRequest.json();
      if(getResponse.statusCode === 200){
        setValidSubjectCode(true);
      }else{
        setValidSubjectCode(false);
      }
      }catch(e){
        setValidSubjectCode(false);
      }  
    }
  }



  
  const handleClose = () => {
   setOpenForm(false);
   };
 
   const descriptionElementRef = useRef(null);
   useEffect(() => {
     if (openForm) {
       const { current: descriptionElement } = descriptionElementRef;
       if (descriptionElement !== null) {
         descriptionElement.focus();
       }
     }
   }, [openForm]);
 
const handleSubmitForm = async (event) =>{
 
//`action`,`category`,`editor_position`,`editor_email`,`edited_email`
  event.preventDefault();
  if(validSubjectCode){
  const data = new FormData();
  data.append('Action', 'Create');
  data.append('EditorPosition', user.position);
  data.append('EditorEmail', user.email);
  data.append('Category', 'Employee');
  

  try{
    const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/admin-panel/controller/user-create-account.php",{
              method: "POST",
              body: data,
          });

          const getResponse = await sendRequest.json();
         
          if(getResponse.statusCode === 200){
            dispatch(CLOSEFORM());
            dispatch(OPENSNACK());
            dispatch(SUCCESSSNACK());
            dispatch(SUCCESSMESSAGESNACK('Created Succesfully'));
          }else{
            dispatch(OPENSNACK());
            dispatch(FAILEDSNACK());
            dispatch(FAILEDMESSAGESNACK());
          }
  }catch(e){

  }
  }else{

  }
}
 
  return(
    <>
    
      {/* <Dialog
        open={openForm}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

        <DialogTitle id="scroll-dialog-title">Add Subject</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddEmployee"  onSubmit={handleSubmitForm} noWrap>
    
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}>
             {validEmail !== false ? (<TextField name ="Email" fullWidth required label="Email" variant="outlined" onKeyUp ={handleChangeEmail} />) : (<TextField error fullWidth  name ="Email" required label="Email" variant="outlined" helperText = {emailHelperText}  onKeyUp ={handleChangeEmail}/>)}
             </Grid2>
        </Grid2>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form ="frmAddEmployee">SUBMIT</Button>
        </DialogActions>
       
      </Dialog>
       */}
    </>
  )
}