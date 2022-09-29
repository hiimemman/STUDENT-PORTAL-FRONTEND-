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

export function AddEmployee(){
  const [scroll, setScroll] = useState('paper');
  //Open add form
const  formOpenType = useSelector(state => state.addForm.value);
  //dispatch from redux
  const dispatch = useDispatch();

  const [position, setPosition] = useState('');
  
  //calendar default value
  const [birthDay, setbirthDay] = useState(null);

  //Validators
  const [validFname, setValidFname] = useState('');
  const [validLname, setValidLname] = useState('');
  const [validEmail, setValidEmail] = useState('');;
  const [validBday, setValidBday] = useState('');
  const [validSex, setValidSex] = useState('');
  const [validContact, setValidContact] = useState('');
  const [validAddress, setValidAddress] = useState('');
  const [emailHelperText, setEmailHelperText] = useState('');
  const [errorSex, seterrorSex] = useState(false);

  const handleChangeFname = (event) =>{
    if((event.target.value).toString().length <= 0){
      setValidFname(false);
    }else{
      setValidFname(true);
    } 
  }
  
  const handleChangeLname = (event) =>{
    if((event.target.value).toString().length <= 0){
      setValidLname(false);
    }else{
      setValidLname(true);
    } 
  }
  
  const handleChangeEmail = async (event) =>{
    if((event.target.value).toString().length <= 0 || !validator.isEmail(event.target.value)){
      setValidEmail(false);
      setEmailHelperText('Invalid Email');
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
        setValidEmail(true);
      }else{
        setValidEmail(false);
        setEmailHelperText('Email already exist!');
      }
      }catch(e){
        setValidEmail(false);
        setEmailHelperText('Server problem!');
      }  
    }
  }

  const handleChangeBday = (event) =>{
    setbirthDay(event)
  }
  
  const handleChangeSex = (event) =>{

  }

  const handleChangeContact = (event) =>{
    const isValidPhoneNumber = validator.isMobilePhone(event.target.value)
    if(isValidPhoneNumber && (event.target.value).toString().length === 11){
        setValidContact(true)
      
    }else{
        setValidContact(false)
    }
  }

  const handleChangeAddress = (event) =>{
    if((event.target.value).toString().length >5){
      setValidAddress(true);
    }else{
      setValidAddress(false);
    }
  }




  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  
  const handleClose = () => {
    dispatch(CLOSEFORM());
   };
 
   const descriptionElementRef = useRef(null);
   useEffect(() => {
     if (formOpenType === 'employee') {
       const { current: descriptionElement } = descriptionElementRef;
       if (descriptionElement !== null) {
         descriptionElement.focus();
       }
     }
   }, [formOpenType]);
 
   const handleSubmitForm = (event) =>{
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  for (var pair of data.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
}
   }
 
  return(
    <>
    
      <Dialog
        open={formOpenType === 'employee'}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

        <DialogTitle id="scroll-dialog-title">Add Employee</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddEmployee"  onSubmit={handleSubmitForm} noWrap>
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={4}>
              {validFname !== false ? (<TextField name ="Fname"  required label="First name" variant="outlined" onKeyUp ={handleChangeFname} />) : (<TextField error  name ="Fname" required label="First name" variant="outlined" helperText ="Must not be empty"  onKeyUp ={handleChangeFname}/>)}
               
             </Grid2>
             <Grid2 item xs={4}><TextField name ="Mname" label="Middle name" variant="outlined" /></Grid2>
             <Grid2 item xs={4}>
             {validLname !== false ? (<TextField name ="Lname"  required label="Last name" variant="outlined" onKeyUp ={handleChangeLname} />) : (<TextField error  name ="Lsname" required label="Last name" variant="outlined" helperText ="Must not be empty"  onKeyUp ={handleChangeLname}/>)}
             </Grid2>
        </Grid2>
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}>
             {validEmail !== false ? (<TextField name ="Email" fullWidth required label="Email" variant="outlined" onKeyUp ={handleChangeEmail} />) : (<TextField error fullWidth  name ="Email" required label="Email" variant="outlined" helperText = {emailHelperText}  onKeyUp ={handleChangeEmail}/>)}
             </Grid2>
        </Grid2>
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}>
             <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Position*</InputLabel>
          <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name = "Position"
          label="Position"
          onChange={handleChange}
        >
          <MenuItem value={'Admin'}>Admin</MenuItem>
          <MenuItem value={'Registrar'}>Registrar</MenuItem>
        </Select>
        </FormControl>
          </Grid2>
        </Grid2>
        {/* <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             
        </Grid2> */}
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px', marginTop: '10px'}}>
        <Grid2 item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
          required
          label="Birthday*"
          inputFormat="MM/DD/YYYY"
          value={birthDay}
          onChange={handleChangeBday}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        </Grid2>
           
              
          <Grid2 item xs={5}> 
          <FormControl error={errorSex}>
  <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
           <RadioGroup
           row
           aria-labelledby="demo-row-radio-buttons-group-label"
           name="Sex"
           id="Sex"
           required
           handleChange = {handleChangeSex}
              >
           <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Male" control={<Radio />}  label="Male"  />
         </RadioGroup>
         </FormControl>
         </Grid2>
        </Grid2>

        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}>{validContact !== false ? (<TextField name ="Contact" fullWidth required label="Contact" variant="outlined" onKeyUp ={handleChangeContact} />) : (<TextField error fullWidth  name ="Contact" required label="Contact" variant="outlined" helperText = "Must be 11 numbers"  onKeyUp ={handleChangeContact}/>)}</Grid2>
        </Grid2>
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}>{validAddress !== false ? (<TextField name ="Address" fullWidth required label="Address" variant="outlined" onKeyUp ={handleChangeAddress} />) : (<TextField error fullWidth  name ="Address" required label="Address" variant="outlined" helperText = "Must be a valid address"  onKeyUp ={handleChangeAddress}/>)}
             </Grid2>
        </Grid2>
      
        <Divider sx ={{marginTop:2, marginBottom:2}}/>
       
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}><TextField defaultValue ="" name ="Twitter" fullWidth label="Twiiter" variant="outlined" /></Grid2>
        </Grid2>
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}><TextField defaultValue ="" name ="Facebook" fullWidth label="Facebook" variant="outlined" /></Grid2>
        </Grid2>
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}><TextField defaultValue ="" name ="Instagram" fullWidth label="Instagram" variant="outlined" /></Grid2>
        </Grid2>
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}><TextField defaultValue ="" name ="LinkedIn" fullWidth label="LinkedIn" variant="outlined" /></Grid2>
        </Grid2>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form ="frmAddEmployee">SUBMIT</Button>
        </DialogActions>
       
      </Dialog>
      
    </>
  )
}