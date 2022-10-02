import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Homepage } from './homepage/Homepage';
import {Student} from './pages/Student';
import {Subject} from './pages/Subject';
import { ParticlesBackground } from './component/ParticlesBackground';




function App() {
 //check current theme
 const selectedTheme = useSelector(state =>(state.selectedTheme.value))

 const darkTheme = createTheme(
 {
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      "Open Sans",
    ].join(",")
  }
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: [
      "Open Sans",
    ].join(",")
  }
})
 useEffect(() =>{
 if(selectedTheme === 'lightTheme'){
   setTheme(lightTheme)
  }else{
 setTheme(darkTheme)
  } 
},[selectedTheme])

 //current theme
 const [currentTheme, setTheme] = useState(lightTheme); 


 
return (

  <StyledEngineProvider injectFirst>
        <ThemeProvider theme={currentTheme}> 
        
    <Router>
      <Routes>
        <Route path ="/" element ={<><Homepage /></>} />
        <Route path = "/loginemployee" element ={<><ParticlesBackground /><SignIn /></>}/>
        <Route path = "/employee/dashboard" element ={<><ParticlesBackground /><Dashboard /></>} />
        <Route path = "/employee/employees" element ={<><ParticlesBackground /><Employees/></>} /> 
        <Route path = "/employee/student" element ={<><ParticlesBackground /><Student/></>} />
        <Route path = "/employee/subject" element ={<><ParticlesBackground /><Subject/></>} /> 
      </Routes>
    </Router>
    
    </ThemeProvider>
      </StyledEngineProvider>
    
  );
}

export default App;
