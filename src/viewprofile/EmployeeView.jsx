import { Alert, Button, Divider, FormControl, InputBase,  NativeSelect, Snackbar, TextField, Typography } from '@mui/material';
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
import {PUT_EMPLOYEE} from '../slice/FormSelectedRow/EmployeeSelected'
import { basedUrl } from '../base-url/based-url';
import { imageBaseUrl } from '../base-url/based-url';

export function EmployeeView(){

    //Selected Employee
const employee = useSelector(state => state.employeeSelected.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

  //dispatch from redux
  const dispatch = useDispatch();

//Valid Firstname
const [validFname, setValidFname] = useState(true);

//Valid Lastname
const [validLname, setValidLname] = useState(true);
//Valid Address
const [validAddress, setValidAddress] = useState(true);

//Valid contact
const [validContact, setValidContact] = useState(true);

//Submit is Loading
const [isLoading, setisLoading] = useState(false);


//Snackbar
const [open, setOpen] = useState(false);// for snackbar

//snackbar status
const [loginStatus, setStatus] = useState("failed");// default is failed for login atttempt alert


//Message of snackbar
const [loginMessage, setMessage ] = useState("Try again");// Default message of alert


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
  


 

  const contactValidator = (props) =>{
  
    const isValidPhoneNumber = validator.isMobilePhone(props.target.value)
    if(isValidPhoneNumber && (props.target.value).toString().length === 11){
        setValidContact(true)
      
    }else{
        setValidContact(false)
    }
}

const firstNameValidator = (props) =>{
  const Length = (props.target.value).toString().length;
  if(Length > 250 || Length <= 0){
    setValidFname(false);
  }else{
    setValidFname(true)
  }
}


const lastNameValidator = (props) =>{
  const Length = (props.target.value).toString().length;
  if(Length > 250 || Length <= 0){
    setValidLname(false);
  }else{
    setValidLname(true)
  }
}

const addressValidator = (props) =>{
  const Length = (props.target.value).toString().length;
  if(Length > 250 || Length <= 0){
    setValidAddress(false);
  }else{
    setValidAddress(true)
  }
}
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
      // console.log(employee.email)
      data.append('Status', employee.status);
      data.append('Email', employee.email);
      data.append('Action', 'Update');
      data.append('EditorPosition', user.position);
      data.append('EditorEmail', user.email);
      data.append('Category', 'Employee');
    //   for (var pair of data.entries()) {
    //     console.log(pair[0]+ ' - ' + pair[1]); 
    // }
      try{
        setisLoading(true);
        //online api
          const sendRequest = await fetch(basedUrl+"/employee-update.php",{
              method: "POST",
              body: data,
          });
          
          const getResponse = await sendRequest.json();
          console.log(getResponse.statusCode)
          if(getResponse.statusCode !== 201){
            dispatch(PUT_EMPLOYEE(getResponse.statusCode));
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
             <Paper elevation={1} sx ={{width:'500 ', paddingTop:'1.5rem'}} style={{ backgroundImage:`url("https://gstatic.com/classroom/themes/img_code.jpg")`,  backgroundRepeat:'no-repeat', backgroundSize: 'cover', }} className ="rounded-xl">
                   <Box component="span" sx={{ p: 3, display: 'flex' ,flexDirection:'column', alignItems: 'center'}}>
                            <Avatar alt="No Image" src={imageBaseUrl+employee.profile_url } sx={{ width: 100, height:    100 }} />  
                        <Typography variant = "h5" color ="white">{employee.firstname} {employee.middlename} {employee.lastname} - ({employee.position})</Typography>
                        <Typography variant ="h7" color ="white">{employee.email}</Typography>
                        <Container sx={{ p:1,display: 'flex', justifyContent: 'center'}}>
                            <TwitterIcon color ="white"></TwitterIcon>
                            <FacebookIcon color ="white"></FacebookIcon>
                            <InstagramIcon color ="white"></InstagramIcon>
                            <LinkedInIcon color ="white"></LinkedInIcon>
                        </Container>
                    </Box>       
             </Paper >
             <Paper elevation={1} sx ={{width:'500 ', padding:'1.5rem',marginTop:'1.5rem'}} className ="rounded-xl">
              <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
        
              <Typography variant ="h4" >About</Typography>
              <TextField defaultValue = {employee.about} name ="About"  id ="About" fullWidth inputProps={{ 'aria-label': 'description' }} variant="standard" />
     
              
              <Divider />
           
        <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Firstname:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            {validFname === true ? (<TextField defaultValue = {employee.firstname} name ="Firstname" id="Firstname" sx={{fontSize:'15px'}} variant="standard" onChange ={firstNameValidator}fullWidth inputProps={{ 'aria-label': 'description' }} />
          ) : 
          (<TextField error defaultValue = {employee.firstname}  name ="Firstname" id="Firstname" sx={{fontSize:'15px'}}helperText ="Must not be empty" variant="standard" onChange ={firstNameValidator} fullWidth inputProps={{ 'aria-label': 'description' }} />
          )}
             </Grid2>
         </Grid2>

         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Middlename:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <TextField variant ="standard" defaultValue = {employee.middlename} name ="Middlename" id="Middlename" sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }}  />
            </Grid2>
         </Grid2>
           
         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Lastname:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            {validLname === true ? (<TextField defaultValue = {employee.lastname} name ="Lastname" id="Lastname" sx={{fontSize:'15px'}} variant="standard" onChange ={lastNameValidator}fullWidth inputProps={{ 'aria-label': 'description' }} />
          ) : 
          (<TextField error defaultValue = {employee.lastname}  name ="Lastname" id="Lastname" sx={{fontSize:'15px'}}helperText ="Must not be empty" variant="standard" onChange ={lastNameValidator} fullWidth inputProps={{ 'aria-label': 'description' }} />
          )}
            </Grid2>
         </Grid2>

         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Email:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <TextField disabled  defaultValue= {employee.email}  sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }} variant ="standard"/>
            </Grid2>
         </Grid2>

         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Position:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
           
        <NativeSelect
        fullWidth
          id="Position"
          defaultValue={employee.position}
          inputProps={{
            name: 'Position',
          }}
        >
          <option value={'Admin'}>Admin</option>
          <option value={'Registrar'}>Registrar</option>
        </NativeSelect>
     
            </Grid2>
         </Grid2>
         
         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Contact Number:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            {/* <Input defaultValue = {employee.contact}  sx={{fontSize:'15px'}} inputProps={{ 'aria-label': 'description' }}  /> */}

            {validContact === false ? (<TextField
              error
              name = "Contact"
              id ="Contact"
                defaultValue= {employee.contact}
                helperText = "Invalid Contact"
                onChange ={contactValidator} fullWidth
                variant="standard"
              />) : (<TextField
              name ="Contact"
                id="Contact"
                defaultValue= {employee.contact}
                onChange ={contactValidator} fullWidth
                variant="standard"
              />)}
            </Grid2>
         </Grid2>

         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Birthday:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            
            <TextField variant ="standard" defaultValue = {employee.birthday} name ="Birthday" type = "date"   id="Birthday" fullWidth sx={{fontSize:'15px'}}   />
            </Grid2>
         </Grid2>

         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
              <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>SEX:  </Typography>
          </Grid2>
          <Grid2 item xs={5}> 
           <RadioGroup
           row
           aria-labelledby="demo-row-radio-buttons-group-label"
           name="Sex"
           id="Sex"
           defaultValue ={employee.sex}
              >
           <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Male" control={<Radio />}  label="Male"  />
         </RadioGroup>
         </Grid2>
        </Grid2>


        <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Address:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            
            {validAddress === true ? (<TextField defaultValue = {employee.address} name ="Address" id="Address" sx={{fontSize:'15px'}} variant="standard" onChange ={addressValidator}fullWidth inputProps={{ 'aria-label': 'description' }} />
          ) : 
          (<TextField error defaultValue = {employee.firstname}  name ="Address" id="Address" sx={{fontSize:'15px'}}helperText ="Must not be empty" variant="standard" onChange ={addressValidator} fullWidth inputProps={{ 'aria-label': 'description' }} />
          )}
            </Grid2>
         </Grid2>
         
         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Date Created:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            
            <TextField variant ="standard" defaultValue = {employee.added_at} fullWidth disabled sx={{fontSize:'15px'}} />
            </Grid2>
         </Grid2>

         <Divider />


    <Typography variant ="h4" sx= {{p:1}} >Optional Url</Typography>
    <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline"  noWrap sx={{fontSize:'15px'}}>Twitter:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <TextField variant ="standard" defaultValue = {employee.twitterprofile} name ="Twitter" id ="Twitter"  sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }} />
            </Grid2>
         </Grid2>
    <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Facebook:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <TextField variant ="standard" defaultValue = {employee.facebookprofile} name ="Facebook" id ="Facebook" sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }} />
            </Grid2>
         </Grid2>

         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Instagram:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <TextField variant = "standard" defaultValue = {employee.instagramprofile} name = "Instagram" id ="Instagram"  sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }} />
            </Grid2>
         </Grid2>
         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>LinkedIn:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <TextField variant ="standard" defaultValue = {employee.linkedinprofile} name ="LinkedIn" id ="LinkedIn"  sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }} />
            </Grid2>
         </Grid2>
        <Divider />
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