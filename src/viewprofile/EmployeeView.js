import { Divider, Grid, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

export function EmployeeView(){

    //Selected Employee
const employee = useSelector(state => state.employeeSelected.value);

//Put employee date for updating
const [editEmployee, setEditEmployee] = useState('');
  //dispatch from redux
  const dispatch = useDispatch();

//Valid contact
const [validContact, setValidContact] = useState(true);

useEffect(()=>{
    const recheckAcc = async () =>{
        const formData = new FormData();
        formData.append("Email", employee.email);
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/employee-view.php",{
            method: "POST",
            body: formData,
        });

        const getResponse = await sendRequest.json();

        if(getResponse.statusCode !== "No email received"){
   
            dispatch(PUT_EMPLOYEE(getResponse[0]));
            setEditEmployee(employee);
            console.log(employee)
        }else{
            console.log(getResponse.statusCode);
        }    
    }

    recheckAcc();
},[employee.email]);


useEffect(() => {
  
    console.log(editEmployee)
 }, [editEmployee])

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  

 const handleChange = (props) =>{
    console.log(props.target.name+ " " + props.target.value)
    setEditEmployee(prevState => ({
        ...prevState,
        [props.target.name]: props.target.value
    }));
 }
 

  const contactValidator = (props) =>{
  
    const isValidPhoneNumber = validator.isMobilePhone(props.target.value)
    if(isValidPhoneNumber && (props.target.value).toString().length === 11){
        setValidContact(true)
        console.log(props.target.name+ " " + props.target.value)
        setEditEmployee(prevState => ({
            ...prevState,
            [props.target.name]: props.target.value
        }));
    }else{
        setValidContact(false)
    }
}

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
              <div id ="primaryInfo">
              <Paper elevation={1} sx ={{width:'500 ', padding:'1.5rem',marginTop:'1.5rem'}} className ="rounded-xl">
                
              <Typography variant ="h4" >About</Typography>
              <Typography variant ="body1" sx ={{marginTop:'5px', fontSize:'25px'}}>{editEmployee.about}</Typography>
              
              <Divider />
              <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <Grid container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Firstname:  </Typography>
            </Grid>
            <Grid item xs={5}> 
            <Input defaultValue = {employee.firstname}  sx={{fontSize:'15px'}} inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
            </Grid>
         </Grid>

         <Grid container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Middlename:  </Typography>
            </Grid>
            <Grid item xs={5}> 
            <Input defaultValue = {employee.middlename}  sx={{fontSize:'15px'}} inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
            </Grid>
         </Grid>
           
         <Grid container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Lastname:  </Typography>
            </Grid>
            <Grid item xs={5}> 
            <Input defaultValue = {employee.lastname}  sx={{fontSize:'15px'}} inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
            </Grid>
         </Grid>

         <Grid container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Email:  </Typography>
            </Grid>
            <Grid item xs={5}> 
            <Input defaultValue = {employee.email}  sx={{fontSize:'15px'}} inputProps={{ 'aria-label': 'description' }}  disabled/>
            </Grid>
         </Grid>

         <Grid container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Position:  </Typography>
            </Grid>
            <Grid item xs={5}> 
            <Input defaultValue = {employee.position}  sx={{fontSize:'15px'}} inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange}/>
            </Grid>
         </Grid>
         
         <Grid container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Contact Number:  </Typography>
            </Grid>
            <Grid item xs={5}> 
            {/* <Input defaultValue = {employee.contact}  sx={{fontSize:'15px'}} inputProps={{ 'aria-label': 'description' }}  onKeyUp = {handleChange} /> */}

            {validContact === false ? (<Input
              error
              id ="Contact"
                defaultValue= {employee.contact}
                helperText = {validContact === false ? ("Invalid Contact") : ("")}
                onChange ={contactValidator}
              />) : (<Input
                id="Contact"
                defaultValue= {employee.contact}
                helperText = {validContact === false ? ("Invalid Contact") : ("")}
                onChange ={contactValidator}
              />)}
            </Grid>
         </Grid>

         <Grid container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Birthday:  </Typography>
            </Grid>
            <Grid item xs={5}> 
            
            <Input defaultValue = {employee.birthday} type = "date" sx={{fontSize:'15px'}}  onKeyUp = {handleChange}/>
            </Grid>
         </Grid>

         <Grid container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid item xs={5}> 
              <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>SEX:  </Typography>
          </Grid>
          <Grid item xs={5}> 
           <RadioGroup
           row
           aria-labelledby="demo-row-radio-buttons-group-label"
           name="row-radio-buttons-group"
              >
           <FormControlLabel value="Female" control={<Radio />} label="Female" name = "sex" onChange ={handleChange} checked={editEmployee.sex === 'Female'} />
          <FormControlLabel value="Male" control={<Radio />} name ="sex" label="Male" onChange =    {handleChange} checked={editEmployee.sex === 'Male'} />
         </RadioGroup>
         </Grid>
        </Grid>


        <Grid container spacing={2} sx ={{marginLeft:'0px', marginTop: '10px'}}>
            <Grid item xs={5}> 
            <Typography variant ="overline" noWrap sx={{fontSize:'15px'}}>Address:  </Typography>
            </Grid>
            <Grid item xs={5}> 
            
            <Input defaultValue = {employee.address} sx={{fontSize:'15px'}}  onKeyUp = {handleChange}/>
            </Grid>
         </Grid>

    </Box>
   </Paper>
             </div>

       </>
    )
}