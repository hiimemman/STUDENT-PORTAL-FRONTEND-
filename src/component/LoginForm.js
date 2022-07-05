import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { PUT_USER, GET_USER,REMOVE_USER } from '../slice/UserSession/userSession';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const theme = createTheme();
export function LoginForm(){

    
//global store states from redux dev
const isLogin = useSelector(state=>state.isAuth)
//dispatch from redux
const dispatch = useDispatch();
//UseNavigate
  const navigate = useNavigate();

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      Email: data.get('Email'),
      Password: data.get('Password'),
    });
    try{
      //online api
        const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/login.php",{
            method: "POST",
            body: data,
        });

      //offline api
    //   const sendRequest = await fetch("http://localhost/student_portal/employee/backend/login.php",{
    //     method: "POST",
    //     body: data,
    // });
        
        const getResponse = await sendRequest.json();
        if(getResponse.statusCode === 201){
         console.log('wrong pass')
        }else{
          // dispatch(login());
          dispatch(PUT_USER(getResponse.statusCode));
          navigate('/Dashboard')
        }
    }catch(e){
      console.log(e)
    }
  };

    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Email Address"
                name="Email"
                autoComplete="email"
                autoFocus
              />
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
                  {/* <Typography>{user.value.email}</Typography>  */}
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>  
    )
}