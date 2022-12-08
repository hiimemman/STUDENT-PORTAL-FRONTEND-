
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StudentDrawerAppBar } from '../component/StudentDrawerAppBar';
import { CssBaseline, FormControl, InputLabel, MenuItem, Paper,Alert, Select,Snackbar, Stack, Input,FormHelperText, AlertTitle } from '@mui/material';
import { Suspense } from 'react';
import { basedUrl } from '../../base-url/based-url';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import { PRE_REGISTRATION } from '../../slice/StudentPageSlice/StudentPageSlice';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import SchedulesChoicesTable from '../component/SchedulesChoicesTable';
import { ScheduleSelectionTable } from '../component/ScheduleSelectionTable';
import { FeeTable } from '../component/FeeTable';
import { RegularScheduleSelectionTable } from '../component/RegularScheduleSelectionTable';
import { PUT_ALL_SCHEDULE, RESET_SCHEDULE } from '../../slice/AddSchedule/AddScheduleSlice';
import { PUT_STUDENT } from '../../slice/StudentSession/studentSession';
import { NightShelter } from '@mui/icons-material';

export function PreRegistration(){
const dispatch = useDispatch();
     //UseNavigate
     const navigate = useNavigate();
     //get student

     const currentPage = useSelector(state =>  (state.studentSelectedPage.value));
     const [currentAcademicYear, setCurrentAcademicYear] = useState(null);
     const [currentSemester, setCurrentSemester] = useState(null);
     
     const studentCurrentPage = useSelector(state => (state.studentSelectedPage.value));
     const studentSession = useSelector(state => JSON.parse(state.student.session))
     const studentFee  = useSelector(state => (state.feeSelection.value));
       //Selected schedule
const schedule = useSelector(state => state.scheduleSelection.value);

     
     const [activeSection, setActiveSectionD] = useState({data:{}});
     const [hasChanged, setHasChanged] = useState(false);
     //page current state
   
      const [activeStep, setActiveStep] = useState(0);

      const [selectedSection, setSelectedSection] = useState(null);
      // const [sectionSchedule, setSectionSchedule] = useState({data:{}});
      const [hasChangedSection , setHasChangedSection] = useState(false);
      const [selectedYear, setSelectedYear] = useState('1st year');
      //Active academic year
      const [activeAcademicYear, setActiveAcademicYear] = useState({data:null});
      const [hasChangeAcadYear, setHasChangeAcadYear] = useState(false);
      const [AcademicYear , setAcademicYear] = useState(studentSession.academicyear);
      const [selectedSemester,  setSelectedSemester] = useState(studentSession.semester);
      const [studentType, setStudentType] = useState(studentSession.type);

// //Schedule transfer list
      const [checked, setChecked] = useState([]);
      const [left, setLeft] = useState({data:{}});
      const [right, setRight] = useState([]);
    

  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
      
const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleReset = () => {
  setActiveStep(0);
};

const handleChangeSelectedSection = (event) =>{
  
  setSelectedSection((selectedSection) => selectedSection = event.target.value);

}

useEffect(() =>{
  if(studentType === 'Regular' && hasChangedSection === true){
    dispatch(PUT_ALL_SCHEDULE(left.data))
    }
  return () =>{

  }
},[left.data, hasChangedSection])

useEffect(() =>{

  return () =>{

  }
},[schedule])

const handleChangeSelectedAcadYear = (event) =>{
  setAcademicYear((AcademicYear) => AcademicYear = event.target.value);
}

const handleChangeSemester= (event) =>{
  setSelectedSemester((selectedSemester) => selectedSemester = event.target.value);
}

const handleChangeSelectedType = (event) =>{
  setStudentType((studentType) => studentType = event.target.value);
}

useEffect(() =>{

  return () =>{

  }
},[selectedSemester])
const getAllActiveAcademicYear = async () => {
  try{ 
    const data = new FormData();
    //online api
       const sendRequest = await fetch(basedUrl+"/all-academic-year-active.php",{
          method: "POST",
          body: data,
      });
      const getResponse = await sendRequest.json();
      // isLoading(false)
      console.log(getResponse)
      if(getResponse.statusCode === 201){
      
      }else{
          setActiveAcademicYear((activeAcademicYear =>  activeAcademicYear = {...activeAcademicYear, data : getResponse}))  
      }
  }catch(e){
    console.error(e)
  }
}

useEffect(() =>{
  getAllActiveAcademicYear();
  return () =>{}
},[studentCurrentPage])

useEffect(() =>{
if(activeAcademicYear.data !== null){
  setHasChangeAcadYear((hasChangeAcadYear) => hasChangeAcadYear = true);
}
  
  return () =>{

  }
},[activeAcademicYear.data])

useEffect(() =>{

  dispatch(RESET_SCHEDULE())
  return () => {}
},[AcademicYear])

useEffect(() =>{

  return () =>{}
},[hasChangeAcadYear])

const getAllScheduleOfSection = async () =>{
  // isLoading(true)
  try{ 
    const data = new FormData();
    data.append('SectionAY', selectedSection );
    //online api
       const sendRequest = await fetch(basedUrl+"/section-schedule-table-registration.php",{
          method: "POST",
          body: data,
      });
      const getResponse = await sendRequest.json();
      // isLoading(false)
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
        // isLoading(false)
        console.log("Soloist")
        console.log(getResponse)
        getResponse.map((item) =>(
          
          setLeft((sectionSchedule) => sectionSchedule = {...sectionSchedule, data : getResponse})
        ));
      }
  }catch(e){
    console.error(e)
  }
}

      useEffect(()=>{
        getAllScheduleOfSection();
        return ()  => {}
      },[selectedSection]);

      useEffect(() =>{
        const checker = {data:{}};
        // setLeft((left) => left = sectionSchedule);
        if(JSON.stringify(left) !== JSON.stringify(checker)){
          //if left data is null
          setHasChangedSection(true);
        }
        return () => {}
      },[left.data])
      
      useEffect(() =>{
        return() => {}
      },[hasChangedSection])

       useEffect(() =>{
        if(studentSession == null){
       
         navigate('/student-portal')
        } 
       },[studentCurrentPage]);


      

       useEffect(() =>{
        dispatch(PRE_REGISTRATION());
        return () => {}
      },[studentCurrentPage])

      useEffect(() =>{
     
        getAllActiveSection();
        return ()=>{}
        
       },[studentCurrentPage]);

       const getAllActiveSection = async () =>{
        try{ 
    
            const sendRequest = await fetch(basedUrl+"/section-active.php");
            const getResponse = await sendRequest.json();
            if(getResponse.statusCode === 201){
            
            }else{
              //if succesfully retrieve data'
  
             setActiveSectionD((activeSection) => activeSection = {...activeSection, data: getResponse});
         
             setHasChanged((prev) => prev = true);
            }
        }catch(e){
          console.error(e)
        }
      }
      
       

       useEffect(() =>{
        let isCancelled = false;
     
        return () => {isCancelled = true}
        },[activeSection]);

        useEffect(() =>{
          let isCancelled = false;
     
          return () => {isCancelled = true}
       },[hasChanged]);

       useEffect(() =>{
        
        return () =>{}
      },[selectedSection])

     
       const SetSchedules  = (props) =>{
        return (
        <>
    <Stack  spacing={2} >
    <FormControl  >
        
        <InputLabel id="demo-simple-select-label">Section*</InputLabel>
            <Select
            required
            defaultValue={selectedSection}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name = "Section"
            label="Section"
            onChange={handleChangeSelectedSection}
          >
       
  
         {props.activeSection.data.filter(section => {
            return section.course === studentSession.course && section.academic_year === currentAcademicYear && section.semester === currentSemester;
          }).map((section) =><MenuItem key = {section.id} value = {section.sectionandacademicyear} >{section.section_name} {section.academic_year}</MenuItem>)}
          
          </Select>
      </FormControl>
     {/* < ScheduleTransferList /> */}
{hasChangedSection === true ?  <SchedulesChoicesTable rows = {left.data} /> : null}
    </Stack>
        
            </>
        )
      }

      function CustomFooterStatusComponent (){
        return(<></>)
    }

    const handleSubmit = async () =>{


      const data = new FormData();
      let sectionandsemester = selectedSection+" "+currentSemester;
      data.append('SectionAndYear', selectedSemester)
      data.append('SectionAndSemester' , sectionandsemester);
      data.append('Semester', currentSemester);
      data.append('StudentNumber', studentSession.studentnumber);
      data.append('AcademicYear' , currentAcademicYear);
      data.append('Schedule', JSON.stringify(schedule));
      data.append('Fee', JSON.stringify(studentFee));
      data.append('StudentNumber', studentSession['studentnumber']);

      for (var pair of data.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
      try{
        const sendRequest = await fetch(basedUrl+"/add-student-registration.php",{
                  method: "POST",
                  body: data,
              });
    
              const getResponse = await sendRequest.json();
             console.log(JSON.stringify(getResponse.statusCode))
              if(getResponse.statusCode === 200){
                setSnackbar({ children: 'Submitted successfully', severity: 'success' });
                // dispatch(CLOSESUBFORM())
                handleReset();
              }else{
                setSnackbar({ children: "Registration Failed", severity: 'error' });
              }
      }catch(e){
        setSnackbar({ children: "There was an error to your connection to the server", severity: 'error' });
        // setSnackbar({ children: "Field can't be empty", severity: 'error' });
      }
    }
    useEffect(() =>{
      return () => {}
    },[snackbar])
    const [checkIfPreregistered, setCheckifPreregisterd] = useState(true);
    
    


    const getStatusPrereg = async () =>{
      // isLoading(true)
      try{ 
        const data = new FormData();
        data.append('StudentId', studentSession.studentnumber );
        //online api
           const sendRequest = await fetch(basedUrl+"/check-pre-registration-pending.php",{
              method: "POST",
              body: data,
          });
          const getResponse = await sendRequest.json();
          console.log("Pumasok dito")
          // isLoading(false)
          if(getResponse.statusCode === 201){
          
          }else{
            console.log(getResponse.content)
            getResponse.content.map((content) =>{
              if(content.status === 'pending'){
                console.log("Pumasok ba dito")
                setCheckifPreregisterd((checkIfPreregistered => checkIfPreregistered = false))
              }
            })
            
          }
      }catch(e){
        console.error(e)
      }
    }
    useEffect(() =>{
      getStatusPrereg();
return () =>{

}
    },[studentCurrentPage])
    
    useEffect(() =>{

      return () =>{}
    },[checkIfPreregistered])

   

    const getAcadYear = async () =>{
     try{ 
    
       //online api
         const sendRequest = await fetch(basedUrl+"/get-active-academicyear.php");
         const getResponse = await sendRequest.json();

         if(getResponse.statusCode === 201){
           console.log(getResponse.error)
         }else{
           //if succesfully retrieve data
        console.log(getResponse)
           setCurrentAcademicYear((currentAcademicYear) => currentAcademicYear = getResponse[0].academicyear);
         }
     }catch(e){
       console.error(e)
     }
    }

    const getSemester = async () =>{
     try{ 
    
       //online api
         const sendRequest = await fetch(basedUrl+"/get-active-semester.php");
         const getResponse = await sendRequest.json();

         if(getResponse.statusCode === 201){
           console.log(getResponse.error)
         }else{
           //if succesfully retrieve data
           console.log(getResponse)
           setCurrentSemester((currentSemester) => currentSemester = getResponse[0].description);
         }
     }catch(e){
       console.error(e)
     }
    }

    useEffect(() =>{
     getSemester();
     getAcadYear();
     return () =>{
       
     }
    },[studentCurrentPage])
    useEffect(() =>{
console.log(currentSemester)
       return () =>{

       }
    },[currentSemester])
console.log(currentAcademicYear)
    useEffect(() =>{
     return () =>{}
    },[currentAcademicYear])
    
    const handleChangeYear = (event) =>{
      setSelectedYear(selectedYear => event.target.value)
    }

    const getSectionScheduleRegular = async () =>{
      // isLoading(true)
      if(selectedYear !== null){
        try{ 
          const data = new FormData();
          data.append('Year', selectedYear);
          data.append('AcademicYear',  currentAcademicYear);
          data.append('Semester', currentSemester);
          data.append('Course', studentSession.course);
          
  for (var pair of data.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
}
          //online api
             const sendRequest = await fetch(basedUrl+"/regular-schedule-table-registration.php",{
                method: "POST",
                body: data,
            });
            const getResponse = await sendRequest.json();
            console.log(getResponse)
            // isLoading(false)
            if(getResponse.statusCode === 201){
            
            }else{
              console.log(getResponse)
            if(getResponse.length > 0){
              setSelectedSection(selectedSection => selectedSection = getResponse[0].sectionacademicyear);
              getResponse.map((item) =>(
                setLeft((sectionSchedule) => sectionSchedule = {...sectionSchedule, data : getResponse})
              ));
            }else{
              console.log("No  rows founds")
            }
            }
        }catch(e){
          console.error(e)
        }
      }
     
    }

    useEffect(() =>{

      return () =>{}
    },[selectedSection])

   

    useEffect(() =>{

      if(studentSession.type === 'Regular'){
        getSectionScheduleRegular();
      }
      return () =>{

      }
    },[selectedYear, currentAcademicYear, currentAcademicYear])



    const refreshStudentSession = async () =>{
      // isLoading(true)
      if(selectedYear !== null){
        try{ 
          const data = new FormData();
          data.append('StudentNumber', studentSession.studentnumber);
       
  for (var pair of data.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
}
          //online api
             const sendRequest = await fetch(basedUrl+"/refresh-student-session.php",{
                method: "POST",
                body: data,
            });
            const getResponse = await sendRequest.json();
            console.log(getResponse)
            // isLoading(false)
            if(getResponse.statusCode === 201){
            
            }else{
              dispatch(PUT_STUDENT(getResponse.statusCode))
            }
        }catch(e){
          console.error(e)
        }
      }
     
    }


    useEffect(() =>{
      refreshStudentSession();
      return () =>{}
    },[studentCurrentPage])

    useEffect(() => {
      return () =>{}
    },[studentSession])

      return(
        <>
        {studentSession !== null ?  (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <StudentDrawerAppBar />
        <Suspense fallback = {
   <Skeleton variant="rectangular" width="100%">
   <div style={{ paddingTop: '57%' }} />
 </Skeleton>
} ></Suspense>

<div className="flex flex-col justify-evenly" style={{width:'100%'}}>
             <h2 className ='font-nunito font-bold'>Pre Registration</h2>
             <Paper elevation={1} sx ={{width:'500', p:'1.5rem', m:'1rem'}} className ="rounded-xl">
             {currentAcademicYear === studentSession.academicyear && currentSemester === studentSession.semester ? 
             (<>
        <Alert severity="info">
        <AlertTitle>Notice</AlertTitle>
        Hello, <strong>{studentSession.firstname+" "+studentSession.lastname}</strong>. You are already <i>enrolled</i> in the current school year; if there was a mistake or error in your schedule, please refer to our campus registrar. <strong> Thank you!</strong>
      </Alert>
      </>) :   ( checkIfPreregistered === true ? 
             (     
               <Box >       
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              
              <Typography sx ={{mb:2}} variant ='subtitle1'>{step.description}</Typography>
            
              <Box sx={{ mb: 2 }}>
                <div>
               {activeStep === 0 ? (<>
                <Stack  spacing={2} >

               
                <FormControl  >    
        <InputLabel id="demo-simple-select-label">Year*</InputLabel>
            <Select
            fullWidth
            required
            defaultValue={selectedYear}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name = "Year"
            label="Year"
            onChange={handleChangeYear}
          >
            <MenuItem key ={'1st year'} value = {'1st year'} >1st year</MenuItem>
            <MenuItem key ={'2nd year'} value = {'2nd year'} >2nd year</MenuItem>
            <MenuItem key ={'3rd year'} value = {'3rd year'} >3rd year</MenuItem>
            <MenuItem key ={'4th year'} value = {'4th year'} >4th year</MenuItem>
          </Select>
      </FormControl>
      </Stack>
               </>) : null}
               
                {activeStep === 1 ? (hasChanged === true ? (studentSession.type === 'Irregular' ? (<>
                <Stack spacing ={2}>
               
                <Typography variant ={'h5'}>Choices</Typography><SetSchedules activeSection = {activeSection} />
                <Divider style ={{marginTop:'1.5rem'}}/>
                <Typography variant ={'h5'}>Your selected schedule</Typography> 
                <div style={{ height: 400, width: '100%' }}>
                  {console.log(schedule)} 
                {JSON.stringify(schedule) !== {} ? studentSession.type === 'Regular' ? <RegularScheduleSelectionTable /> :  <ScheduleSelectionTable /> : null}
                </div>

                </Stack></>) :  <Alert severity="info">
        <AlertTitle>Notice</AlertTitle>
        Hello, <strong>{studentSession.firstname+" "+studentSession.lastname}</strong>. You are a <i>regular student</i> Your section will be automatically selected. <strong> Thank you!</strong>
      </Alert>) : null) : null}
                
                {activeStep === 2 ? (<>
                <Typography variant = {'h3'}>{schedule[0].section_name}</Typography>
                  <Stack spacing ={2}>
                  <Typography variant ={'h5'}>Account</Typography>
                  <FeeTable />
                  </Stack>
                </>) : null}

                {activeStep === 3 ? (<>
                  <Stack spacing ={2}>
                  
                  <Typography variant ={'h5'}>Account Summary</Typography>
                  <Typography variant ={'h6'}>Schedule</Typography>
                  <Box sx ={{p:0}}>
                  <DataGrid
        components={{  LoadingOverlay: LinearProgress,}} rows={schedule} columns={schedColumns} autoHeight pageSize={5} 
      />
                  </Box>
                  <Typography variant ={'h6'}>Fee</Typography>
                  <Box sx ={{p:0}}>
        <Box sx={{ width: '100%' }}>
      <DataGrid
components={{ LoadingOverlay: LinearProgress, Footer: CustomFooterStatusComponent}}
        rows={studentFee[0]}
        columns={feeColumns}
       autoHeight
      />
    </Box>
    <Box sx={{  width: '50%' }}>
    <DataGrid
components={{ LoadingOverlay: LinearProgress, Footer: CustomFooterStatusComponent}}
        rows={studentFee[1]}
        columns={totalColumns}
       autoHeight
      />
    </Box>
    </Box>
                  </Stack>
                </>) : null}
                {index === steps.length - 1 ?  <Button
                  disabled ={!hasChanged}
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Finish
                  </Button> :   <Button
                  disabled ={!hasChanged}
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? null : 'Continue'}
                  </Button>}
                
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
     
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>) :    <Alert severity="success">
        <AlertTitle>Warning</AlertTitle>
        Congratulations on reregistering; your pre-registration is being processed. Please wait for confirmation.<strong> Thank you!</strong>
      </Alert>)
      }
           
       
    </Paper>

</div> 
{!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      </Box>) :  (<Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={1500}
        height={690}
      />
      )}
        </>
    )
}

const totalColumns = [
  {
    field: 'description',
    headerName: 'Description',
    width: 390,
    editable: false,
  },
  {
      field: 'amount',
      headerName: 'Amount',
      width: 384,
      editable: false,
  },
];


const steps = [
  {
    label: 'Select your student information',
    description: `Make sure you double check your student information before pressing continue`,
  },
  {
    label: 'Select your schedules',
    description: `Make sure you double check your schedule before pressing continue`,
  },
  {
    label: 'Assessment of Fees',
    description:
      'Make sure to double-check your remaining balance.',
  },
  {
    label: 'Finalize',
    description: `Double-check the information before clicking "Finish."`,
  },
];


const feeColumns = [
  {
    field: 'name',
    headerName: 'Fee name',
    width: 390,
    editable: false,
  },
  {
      field: 'amount',
      headerName: 'Amount',
      width: 384,
      editable: false,
  },
  {
      field: 'subtotal',
      headerName: 'Subtotal',
      width: 390,
      editable: false,
  },
];



const schedColumns = [
  { field: 'sched_code', headerName: 'Sched Code',  flex: 1,
  minWidth: 0, maxWidth: 100, },
  { field: 'subject_name', headerName: 'Subject Name',  flex: 1,
  minWidth: 0, maxWidth: 150,},
  { field: 'units', headerName: 'Units',  flex: 1,
  minWidth: 0, maxWidth: 50,},
  { field: 'schedule_day', headerName: 'Days',  flex: 1,
  minWidth: 250,},
  { field: 'schedule_time', headerName: 'Time',  flex: 1,
  minWidth: 350,},
  { field: 'semester', headerName: 'Semester',  flex: 1,
  minWidth: 0, },
  { field: 'professor_initial', headerName: 'Professor',  flex: 1,
  minWidth: 0,},
];