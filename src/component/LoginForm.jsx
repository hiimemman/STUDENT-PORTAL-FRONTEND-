import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { PUT_USER } from '../slice/UserSession/userSession';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import validator from 'validator'
import { PaperLine } from './PaperLine';
import { ParticlesBackground } from './ParticlesBackground';
import { basedUrl, imageBaseUrl } from '../base-url/based-url';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import {DASHBOARD} from '../slice/PageSlice/PageSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const theme = createTheme();
export function LoginForm(){
  //check current theme
 const selectedTheme = useSelector(state =>(state.selectedTheme.value))
    
//global store states from redux dev
const isLogin = useSelector(state=>state.isAuth)
//dispatch from redux
const dispatch = useDispatch();
//UseNavigate
  const navigate = useNavigate();

  const [isLoading , setisLoading] = useState(false);

   //If email is correct
   const [emailValid, setEmailValid] = useState("");

  const [open, setOpen] = useState(false);// for snackbar

  //snackbar status
  const [loginStatus, setStatus] = useState("failed");// default is failed for login atttempt alert
 

  //Message of snackbar
  const [loginMessage, setMessage ] = useState("Try again");// Default message of alert
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(emailValid === true){
      const data = new FormData(event.currentTarget);
      
      try{
        setisLoading(true);
        //online api
          const sendRequest = await fetch(basedUrl+"/login.php",{
              method: "POST",
              body: data,
          });
  
        //offline api
      //   const sendRequest = await fetch("http://localhost/student_portal/employee/backend/login.php",{
      //     method: "POST",
      //     body: data,
      // });
          
          const getResponse = await sendRequest.json();
          console.log(getResponse.statusCode)
          if(getResponse.statusCode === 201){
            setOpen(true);
            setStatus("error");
            setMessage("Wrong email or password")
            setisLoading(false);
          }else{
            dispatch(DASHBOARD());
            setisLoading(false);
            setMessage("Log in successfull")
            setStatus("success");
            dispatch(PUT_USER(getResponse.statusCode));
            setisLoading(false);
            navigate('/employee/dashboard')
          }
      }catch(e){
        setisLoading(false);
        setMessage(e);
      }
    }else{
      //else call snackbar says error
      setMessage("Wrong  email or password");
    }
    
  
  }
  //Snackbar

  useEffect(() =>{
 
     return () =>{
   
     }
   },[selectedTheme])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const emailValidator = (email) =>{
    if (validator.isEmail(email.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
      setMessage('Enter valid Email!');
    }
  }

    return(
      <>
        <CssBaseline />
        <Container component="main" maxWidth="xs" sx ={{p:0}}>
        
         
          <div className='grid h-screen place-items-center'>
          
          <Paper 
  sx={{
    borderRadius: 2,
  }}>        
  {/* <PaperLine/> */}
  {isLoading === true ? (<LinearProgress className ="rounded-t-xl p-1" />) : ("")}
  <IconButton color="secondary" style ={{position: 'absolute'}} onClick ={() => {navigate('/')}}><HomeIcon />
  </IconButton>
          <Box
            sx={{
              paddingTop:5,
              paddingRight: 3,
              paddingLeft: 3,
              paddingBottom:5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          > 
        
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography> */}
           {selectedTheme !== 'lightTheme' ? (<img  src= {imageBaseUrl+"Aisat-Mis-Dark.svg"} alt="SVG as an image" />) : 
            (<img src= {imageBaseUrl+"Aisat-Mis-Light.svg"}  alt="SVG as an image" />)}
           
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Divider />
              {emailValid === false ? (<TextField
              error
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Email"
                name="Email"
                autoComplete="email"
                autoFocus
                helperText = {emailValid === false ? ("Invalid Email") : ("")}
                onKeyUp ={emailValidator}
              />) : (<TextField
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Email"
                name="Email"
                autoComplete="email"
                autoFocus
                helperText = {emailValid === false ? ("Invalid Email") : ("")}
                onKeyUp ={emailValidator}
              />)}
              <TextField
              
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="current-password"
                
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
       <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
               
                >
                Sign In
              </Button>    
             
              <Grid container>
                <Grid item xs>

                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
            </Box>
             </Box>
            </Paper>
          </div>
          {/* Snackbar */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity= {loginStatus} sx={{ width: '100%' }}>
                {loginMessage}
             </Alert>
            </Snackbar>
        </Container>
    </>
    );
}