import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect} from 'react';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Homepage } from './homepage/Homepage';
import {Student} from './pages/Student';
import {Subject} from './pages/Subject';
import { ParticlesBackground } from './component/ParticlesBackground';
import { Course } from './pages/Course';
import { Faculty } from './pages/Faculty';
import { Skeleton } from '@mui/material';
import { Section } from './pages/Section';
import { Professor } from './pages/Professor';
import { StudentSignIn } from './student-portal/StudentSignIn';




function App() {

  const initialStateTheme = createTheme({
    palette: {
      mode: 'light',
    },
    typography: {
      fontFamily: [
        "Open Sans",
      ].join(",")
    }
  })
 
 //check current theme
 const selectedTheme = useSelector(state =>(state.selectedTheme.value))

//current theme
const [currentTheme, setTheme] = useState(initialStateTheme); 



const lightTheme = createTheme({
  palette: {
    mode: 'light',
  }, 
  palette: {
    primary: {
      light: '#757ce8',
      main: '#01579b',
      dark: '#002884',
      contrastText: '#fff',
      
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      "Open Sans",
    ].join(",")
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "darkred",
          backgroundColor: 'rgb(248 250 252)',
          "& h1": {
            color: "black"
          }
        }
      }
    }
  }
})
 const darkTheme = createTheme(
 {
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      "Open Sans",
    ].join(",")
  },
})


 useEffect(() =>{
 if(selectedTheme === 'lightTheme'){
   setTheme(lightTheme)
  }else{
 setTheme(darkTheme)
  } 
  return () =>{

  }
},[selectedTheme])



return (
<>
 <StyledEngineProvider injectFirst>
  <ThemeProvider theme={currentTheme}> 
    <Router>
      <Routes>
        <Route path = "/" element = {<Homepage />} />
        <Route path = "/loginemployee" element ={<><ParticlesBackground /><SignIn /></>} />
        <Route path = "/employee/dashboard" element ={<><Dashboard /></>} />
        <Route path = "/employee/employees" element ={<><Employees/></>} /> 
        <Route path = "/employee/professor" element ={<><Professor /></>} />
        <Route path = "/employee/student" element ={<><Student/></>} />
        <Route path = "/employee/subject" element ={<><Subject/></>} /> 
        <Route path = "/employee/faculty" element ={<><Faculty/></>} />
        <Route path = "/employee/course" element ={<><Course/></>} />
        <Route path = "/employee/section" element ={<><Section/></>} />
        <Route path = "/student-portal" element ={<><ParticlesBackground /><StudentSignIn /></>} />
      </Routes>
    </Router>
  </ThemeProvider>
 </StyledEngineProvider>    
</>
  );
}

export default App;
