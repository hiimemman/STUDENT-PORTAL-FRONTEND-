import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { Homepage } from './pages/Homepage';
import { Employees } from './pages/Employees';




function App() {
 //check current theme
 const selectedTheme = useSelector(state =>(state.selectedTheme.value))

 const darkTheme = createTheme(
 {
  palette: {
    mode: 'dark',
  },
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
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
        <Route path ="/" element ={<Homepage />} />
        <Route path = "/loginemployee" element ={<SignIn />}/>
        <Route path = "/employee/dashboard" element ={<Dashboard />} />
        <Route path = "/employee/employees" element ={<Employees/>} />
      </Routes>
    </Router>
    </ThemeProvider>
      </StyledEngineProvider>
  );
}

export default App;
