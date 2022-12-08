
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StudentDrawerAppBar } from '../component/StudentDrawerAppBar';
import { CssBaseline, FormControl, InputLabel, MenuItem, Paper,Alert, Select,Snackbar, Stack, Input,FormHelperText } from '@mui/material';
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
import { NightShelter } from '@mui/icons-material';

export function PreRegistration(){
const dispatch = useDispatch();
     //UseNavigate
     const navigate = useNavigate();
     //get student
     
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
            return section.course === studentSession.course && section.academic_year === AcademicYear && section.semester === selectedSemester;
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
      let sectionandsemester = selectedSection+" "+selectedSemester;
      data.append('SectionAndYear', selectedSemester)
      data.append('SectionAndSemester' , sectionandsemester);
      data.append('Semester', selectedSemester);
      data.append('StudentNumber', studentSession.studentnumber);
      data.append('AcademicYear' , AcademicYear);
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
                  <Stack spacing ={2}>
                  
                  <FormControl  >
        
        <InputLabel id="demo-simple-select-label">Academic year*</InputLabel>
            <Select
            required
            defaultValue={studentSession.academicyear}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name = "AcademicYear"
            label="AcademicYear"
            onChange={handleChangeSelectedAcadYear}
          >
       
       {hasChangeAcadYear === true ?  (activeAcademicYear.data.map((acadYear) =><MenuItem key = {acadYear} value = {acadYear.academicyear} >{acadYear.academicyear}</MenuItem>)) : null   }
          
          </Select>
      </FormControl>
      <FormControl  >
        
        <InputLabel id="demo-simple-select-label">Semester*</InputLabel>
            <Select
            required
            defaultValue={selectedSemester}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name = "Semester"
            label="Semester"
            onChange={handleChangeSemester}
          >
       
     
       <MenuItem value = {'1st semester'} >1st semester</MenuItem>
       <MenuItem value = {'2nd semester'} >2nd semester</MenuItem>
          </Select>
      </FormControl>
      <FormControl  >
        
        <InputLabel id="demo-simple-select-label">Type*</InputLabel>
            <Select
            required
            defaultValue={studentType}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name = "StudentType"
            label="Type"
            onChange={handleChangeSelectedType}
          >
       
     
       <MenuItem value = {'Irregular'} >Irregular</MenuItem>
       <MenuItem value = {'Regular'} >Regular</MenuItem>
          </Select>
      </FormControl>

                  </Stack>
                </>) : null}
                {hasChanged === true ? (activeStep === 1 ? (<>
                <Stack spacing ={2}>
                <Typography variant ={'h5'}>Choices</Typography><SetSchedules activeSection = {activeSection} />
                <Divider style ={{marginTop:'1.5rem'}}/>
                <Typography variant ={'h5'}>Your selected schedule</Typography> 
                <div style={{ height: 400, width: '100%' }}>
                  {console.log(schedule)} 
                {JSON.stringify(schedule) !== {} ? studentType === 'Regular' ? <RegularScheduleSelectionTable /> :  <ScheduleSelectionTable /> : null}
              
               
                </div>
                </Stack></>) : null) : null}
                
                {activeStep === 2 ? (<>
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
    </Box>
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
  { field: 'sched_code', headerName: 'Sched Code', width: 100 },
  { field: 'subject_name', headerName: 'Subject Name', width: 130 },
  { field: 'units', headerName: 'Units', width: 50 },
  { field: 'schedule_day', headerName: 'Days', width: 150 },
  { field: 'schedule_time', headerName: 'Time', width: 350 },
  { field: 'semester', headerName: 'Semester', width: 180 },
  { field: 'professor_initial', headerName: 'Professor', width: 150 },
];