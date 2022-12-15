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
import { StudentDetails } from './viewselected/StudentDetails';
import { StudentDashboard } from './student-portal/pages/StudentDashboard';
import { PreRegistration } from './student-portal/pages/PreRegistration';
import { Fee } from './pages/Fee';
import { Checklist } from './student-portal/pages/Checklist';
import { StudentSchedule } from './student-portal/pages/StudentSchedule';
import { AcademicYear } from './pages/AcademicYear';
import { Announcement } from './pages/Announcement';
import { Profile } from './pages/Profile';
import { StudentRegistration } from './pages/StudentRegistration';
import { Grades } from './student-portal/pages/Grades';
import { GradesPerSection } from './student-portal/pages/GradesPerSection';
import { Balance } from './student-portal/pages/Balance';
import { HomepageAnnouncement } from './homepage/HomepageAnnouncement';
import { ProfessorSignIn } from './professor-portal/ProfessorSignin';
import { ProfessorDashboard } from './professor-portal/pages/ProfessorDashboard';
import { ProfessorSchedule } from './professor-portal/pages/ProfessorSchedule';
import { Grading } from './professor-portal/pages/Grading';
import { UpdateGradesPerSection } from './professor-portal/pages/UpdateGradesPerSection';
import { Semester } from './pages/Semester';
import { StudentProfile } from './student-portal/pages/StudentProfile';
import { ProfessorProfile } from './professor-portal/pages/ProfessorProfile';
import { Activity } from './pages/Activity';



function App() {

  const initialStateTheme = createTheme({
    palette: {
      mode: 'light',
    }, 
    palette: {
      primary: {
        light: '#757ce8',
        main: '#112444',
        dark: '#002884',
        contrastText: '#fff',
      }
    },
    typography: {
      fontFamily: [
        "Open Sans",
      ].join(","),
      
      h3: {
        color: "#112444"
      },
    },
     components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-style: normal;
            font-display: swap;
            font-weight: 800;
             }
        `,
      },
    },
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
      main: '#112444',
      dark: '#002884',
      contrastText: '#fff',
    }
  },
  typography: {
    h3: {
      color: "#112444",
    },
      body1: {
        fontWeight: 600 // or 'bold'
    },
    body2: {
      fontSize: [16, "!important"]
  },
  },
   components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-style: normal;
          font-display: swap;
          font-weight: 800;
           }
      `,
    },
  },
})
 const darkTheme = createTheme(
 {
  palette: {
    mode: 'dark',
  },
  typography: {
    body1: {
      fontWeight: 600 // or 'bold'
  },
  body2: {
    fontSize: [16, "!important"]
}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-style: normal;
          font-display: swap;
          font-weight: 800;
        }
      `,
    },
  },
})


 useEffect(() =>{
 if(selectedTheme === 'darkTheme'){
  setTheme((prev) => prev = darkTheme)
  }else{
    setTheme((prev) => prev = lightTheme)
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
        <Route path = "/employee/student-registration" element ={<><StudentRegistration /></>} />
        <Route path = "/employee/subject" element ={<><Subject/></>} /> 
        <Route path = "/employee/faculty" element ={<><Faculty/></>} />
        <Route path = "/employee/course" element ={<><Course/></>} />
        <Route path = "/employee/section" element ={<><Section/></>} />
        <Route path ="/employee/fee" element = {<><Fee /></>}></Route>
        <Route path ="/employee/academicyear" element = {<><AcademicYear /></>}></Route>
        <Route path ="/employee/announcement" element = {<><Announcement /></>}></Route>
        <Route path ="/employee/semester" element = {<><Semester /></>}></Route>
        <Route path ="/employee/profile" element = {<><Profile /></>}></Route>
        <Route path ="/employee/activity" element = {<><Activity /></>}></Route>
        <Route path = "/student-portal" element ={<><ParticlesBackground /><StudentSignIn /></>} />

        <Route path ="/student-portal/dashboard" element ={<><StudentDashboard /></>} />.
        <Route path ="/student-portal/pre-registration" element ={<><PreRegistration /></>} />
        <Route path ="/student-portal/curriculum" element ={<><Checklist /></>} />
        <Route path ="/student-portal/schedule" element ={<><StudentSchedule /></>} />
        <Route path ="/student-portal/grades" element ={<><Grades /></>}/>
        <Route path ="/student-portal/balance" element ={<><Balance /></>}/>
        <Route path ="/announcement/:id" element ={<><HomepageAnnouncement /></>}/>
        <Route path ="/student-portal/grades/:studentnumber/:sectionandsemester" element ={<><GradesPerSection /></>}/>
        <Route path ="/student-portal/profile" element ={<><StudentProfile /></>}/>
        <Route path = "/employee/section/student/:id"  element ={<StudentDetails />}/>
        <Route path = "/professor-portal" element ={<><ParticlesBackground /><ProfessorSignIn /></>} /> 
        <Route path ="/professor-portal/dashboard" element ={<><ProfessorDashboard /></>} />
        <Route path ="/professor-portal/profile" element ={<><ProfessorProfile /></>} />
        <Route path ="/professor-portal/schedule" element ={<><ProfessorSchedule /></>} />
        <Route path ="/professor-portal/grading" element ={<><Grading /></>} />
        
        <Route path ="/professor-portal/grading/:initial/:sectionandacademicyear" element ={<><UpdateGradesPerSection /></>} />

      </Routes>
      
    </Router>
  </ThemeProvider>
 </StyledEngineProvider>    
</>
  );
}

export default App;
