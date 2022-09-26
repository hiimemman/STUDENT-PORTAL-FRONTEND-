import { Button, Divider, FormControl, InputBase,  NativeSelect, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {PUT_EMPLOYEE} from '../slice/FormSelectedRow/EmployeeSelected'
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

export function EmployeeView(){

    //Selected Employee
const employee = useSelector(state => state.employeeSelected.value);

//Put employee date for updating
const [editEmployee, setEditEmployee] = useState('');
  //dispatch from redux
  const dispatch = useDispatch();

//Valid contact
const [validContact, setValidContact] = useState(true);

//Submit is Loading
const [isLoading, setisLoading] = useState(false);




const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  

 const handleChange = (props) =>{
   console.log(props.target.name +" " +props.target.value);
    setEditEmployee(prevState => ({
        ...prevState,
        [props.target.name]: props.target.value
    }));
 }
 

  const contactValidator = (props) =>{
  
    const isValidPhoneNumber = validator.isMobilePhone(props.target.value)
    if(isValidPhoneNumber && (props.target.value).toString().length === 11){
        setValidContact(true)
        setEditEmployee(prevState => ({
            ...prevState,
            [props.target.name]: props.target.value
        }));
    }else{
        setValidContact(false)
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
    if(validContact=== true){
      const data = new FormData(event.target);
      data.append('Email', editEmployee.email);
      for (var pair of data.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
      try{
        setisLoading(true);
        //online api
          const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/employee-update.php",{
              method: "POST",
              body: data,
          });
          
          const getResponse = await sendRequest.json();
          if(getResponse.statusCode !== 201){
            // setOpen(true);
            // setStatus("error");
            // setMessage("Wrong email or password")
            dispatch(PUT_EMPLOYEE(getResponse.statusCode[0]));
            console.log(employee);
            setisLoading(false);
          }else{
            // setisLoading(false);
            // setMessage("Log in successfull")
            // setStatus("success");
            setisLoading(false);
          }
      }catch(e){
        setisLoading(false);
        // setMessage(e);
      }
    }else{
      //else call snackbar says error
    //   setMessage("Wrong  email or password");
    }
  }

//   useEffect(()=>{
//     const recheckAcc = async () =>{
//         const formData = new FormData();
//         formData.append("Email", employee.email);
//         const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/employee-view.php",{
//             method: "POST",
//             body: formData,
//         });

//         const getResponse = await sendRequest.json();

//         if(getResponse.statusCode !== "No email received"){
//           await setEditEmployee(employee);
//           await dispatch(PUT_EMPLOYEE(editEmployee));
//         }else{
            
//         }    
//     }

//     recheckAcc();
// },[setEditEmployee]);

 
    return(
        <>
             <Paper elevation={1} sx ={{width:'500 ', paddingTop:'1.5rem'}} className ="rounded-xl">
                   <Box component="span" sx={{ p: 3, display: 'flex' ,flexDirection:'column', alignItems: 'center'}}>
                        <StyledBadge badgeContent={4} sx={{p:1}} color="secondary">
                            <Avatar alt="No Image" src={employee.profile_url } sx={{ width: 100, height:    100 }} />  
                        </StyledBadge>
                        <Typography variant = "h5">{employee.firstname} {employee.middlename} {employee.lastname} - ({employee.position})</Typography>
                        <Typography variant ="h7">{employee.email}</Typography>
                        <Container sx={{ p:1,display: 'flex', justifyContent: 'center'}}>
                            <TwitterIcon></TwitterIcon>
                            <FacebookIcon></FacebookIcon>
                            <InstagramIcon></InstagramIcon>
                            <LinkedInIcon></LinkedInIcon>
                        </Container>
                    </Box>       
             </Paper >
             <Paper elevation={1} sx ={{width:'500 ', padding:'1.5rem',marginTop:'1.5rem'}} className ="rounded-xl">
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        
              <Typography variant ="h4" >About</Typography>
              <TextField defaultValue = {employee.about} name ="About"  id ="About" fullWidth inputProps={{ 'aria-label': 'description' }} variant="standard" />
     
              
              <Divider />
           
        <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Firstname:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <Input defaultValue = {employee.firstname} name ="Firstname" id="Firstname" sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
            </Grid2>
         </Grid2>

         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Middlename:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <Input defaultValue = {employee.middlename} name ="Middlename" id="Middlename" sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
            </Grid2>
         </Grid2>
           
         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Lastname:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <Input defaultValue = {employee.lastname} name ="Lastname" id="Lastname"  sx={{fontSize:'15px'}}fullWidth inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
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
            {/* <Input defaultValue = {employee.contact}  sx={{fontSize:'15px'}} inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange} /> */}

            {validContact === false ? (<Input
              error
              name = "Contact"
              id ="Contact"
                defaultValue= {employee.contact}
                helperText = {validContact === false ? ("Invalid Contact") : ("")}
                onChange ={contactValidator} fullWidth
              />) : (<Input
              name ="Contact"
                id="Contact"

                defaultValue= {employee.contact}
                helperText = {validContact === false ? ("Invalid Contact") : ("")}
                onChange ={contactValidator} fullWidth
              />)}
            </Grid2>
         </Grid2>

         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Birthday:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            
            <Input defaultValue = {employee.birthday} name ="Birthday" type = "date"   id="Birthday" fullWidth sx={{fontSize:'15px'}}   onKeyUp = {handleChange}/>
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
              >
           <FormControlLabel value="Female" control={<Radio />} label="Female" onChange ={handleChange} checked={employee.sex === 'Female'} />
          <FormControlLabel value="Male" control={<Radio />}  label="Male" onChange =    {handleChange} checked={employee.sex === 'Male'} />
         </RadioGroup>
         </Grid2>
        </Grid2>


        <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Address:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            
            <Input defaultValue = {employee.address} name ="Address"   id="Address" sx={{fontSize:'15px'}}  fullWidth onKeyUp = {handleChange}/>
            </Grid2>
         </Grid2>
         
         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Date Created:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            
            <Input defaultValue = {employee.added_at} fullWidth disabled sx={{fontSize:'15px'}}  onKeyUp = {handleChange}/>
            </Grid2>
         </Grid2>

         <Divider />


    <Typography variant ="h4" sx= {{p:1}} >Optional Url</Typography>
    <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline"  noWrap sx={{fontSize:'15px'}}>Twitter:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <Input defaultValue = {employee.twitterprofile} name ="Twitter" id ="Twitter"  sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
            </Grid2>
         </Grid2>
    <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Facebook:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <Input defaultValue = {employee.facebookprofile} name ="Facebook" id ="Facebook" sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
            </Grid2>
         </Grid2>

         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Instagram:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <Input defaultValue = {employee.instagramprofile} name = "Instagram" id ="Instagram"  sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
            </Grid2>
         </Grid2>
         <Grid2 container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid2 item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>LinkedIn:  </Typography>
            </Grid2>
            <Grid2 item xs={5}> 
            <Input defaultValue = {employee.linkedinprofile} name ="LinkedIn" id ="LinkedIn"  sx={{fontSize:'15px'}} fullWidth inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
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

       </>
    )
}