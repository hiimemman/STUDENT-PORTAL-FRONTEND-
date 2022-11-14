
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StudentDrawerAppBar } from '../component/StudentDrawerAppBar';
import { CssBaseline, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Input,FormHelperText } from '@mui/material';
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


export function PreRegistration(){
const dispatch = useDispatch();
     //UseNavigate
     const navigate = useNavigate();
     //get student
     
     const studentCurrentPage = useSelector(state => (state.studentSelectedPage.value));
     const studentSession = useSelector(state => JSON.parse(state.student.session))

     const [activeSection, setActiveSectionD] = useState({data:{}});
     const [hasChanged, setHasChanged] = useState(false);
     //page current state
   
      const [activeStep, setActiveStep] = useState(0);

      const [selectedSection, setSelectedSection] = useState(null);
      // const [sectionSchedule, setSectionSchedule] = useState({data:{}});
      const [hasChangedSection , setHasChangedSection] = useState(false);


// //Schedule transfer list
      const [checked, setChecked] = useState([]);
      const [left, setLeft] = useState({data:{}});
      const [right, setRight] = useState([]);
    

      
      
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
            return section.course === studentSession.course;
          }).map((section) =><MenuItem key = {section.id} value = {section.sectionandacademicyear} >{section.section_name} {section.academic_year}</MenuItem>)}
          
          </Select>
      </FormControl>
     {/* < ScheduleTransferList /> */}
{hasChangedSection === true ?  <SchedulesChoicesTable rows = {left.data} /> : null}
    </Stack>
       
         
            </>
        )
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
             <Paper elevation={1} sx ={{width:'500', p:'1.5rem', m:1}} className ="rounded-xl">
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
                {hasChanged === true ? (activeStep === 0 ? (<>
                <Stack spacing ={2}>
                <Typography variant ={'h6'}>Choices</Typography><SetSchedules activeSection = {activeSection} />
                <Divider style ={{marginTop:'1.5rem'}}/>
                <Typography variant ={'h6'}>Your selected schedule</Typography> 
                <div style={{ height: 400, width: '100%' }}> 
              
                <ScheduleSelectionTable />
                </div>
                </Stack></>) : null) : null}
            
                  <Button
                  disabled ={!hasChanged}
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
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




const steps = [
  {
    label: 'Select your schedules',
    description: `Make sure you double check your schedule before pressing continue`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];



