



import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StudentDrawerAppBar } from '../component/StudentDrawerAppBar';
import { CssBaseline, Divider, Paper, Stack } from '@mui/material';
// import { DashboardCard } from '../component/DashboardCard/DashboardCard';
import { Suspense } from 'react';;
import { GRADES } from '../../slice/StudentPageSlice/StudentPageSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { basedUrl } from '../../base-url/based-url';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport ,GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';


export function GradesPerSection(){
    const {studentnumber, sectionandsemester} = useParams();
     //UseNavigate
     const navigate = useNavigate();

     const dispatch = useDispatch();
     //get student
     const studentSession = useSelector(state => JSON.parse(state.student.session))

     const [loading, isLoading] = useState(false);

     const [rows, setRows] = useState({});

     const [changeRows, setChangedRows] = useState({
      semester: '',
      academic_year: '',
    });

    const [gradesCollection , setGradesCollection] = useState({});

    const [gpa, setGpa] = useState(0);

     const currentPage = useSelector(state =>  (state.studentSelectedPage.value));
    
     const getAllGradesCollection = async () =>{
        isLoading(true)
        try{ 
          const data = new FormData();
          data.append('StudentId', studentSession.studentnumber);
      
          //online api
             const sendRequest = await fetch(basedUrl+"/get-schedule-per-student.php",{
                method: "POST",
                body: data,
            });
            const getResponse = await sendRequest.json();
            console.log(getResponse)
            isLoading(false)
            if(getResponse.statusCode === 201){
            
            }else{
              //if succesfully retrieve data
              isLoading(false)
          
             
            }
        }catch(e){
          console.error(e)
        }
      }

      useEffect(() =>{
        return () =>{}
      },[gpa])
     

    useEffect(() =>{
        if(studentSession === null){
         navigate('/student-portal')
        } 
       },[navigate, studentSession]);

       const [year, setYear] = useState('1st year');


       const getAllData = async () =>{
        isLoading(true)
        try{ 
          const data = new FormData();
       
          data.append('StudentId', studentnumber);
          data.append('SectionAndSemester', sectionandsemester);
          //online api
             const sendRequest = await fetch(basedUrl+"/get-grades-per-student.php",{
                method: "POST",
                body: data,
            });
            const getResponse = await sendRequest.json();
            console.log(getResponse)
            isLoading(false)
            if(getResponse.statusCode === 201){
            
            }else{
              //if succesfully retrieve data
              isLoading(false)
              setRows(getResponse.content);
              let gpacontent = 0;
              let sum = 0;
      
              getResponse.content.map(grades =>{
                sum = parseFloat(sum) + parseFloat(grades.grade)
               
              })
              gpacontent = parseFloat(sum) / getResponse.content.length;
              setGpa((gpa) => gpa = gpacontent);
            }
        }catch(e){
          console.error(e)
        }
      }

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  useEffect(() =>{
    getAllData();
    
    return () =>{}
  },[currentPage]);

  useEffect(() =>{

    if(rows.length > 0){
      setChangedRows((changeRows => changeRows = true));
    }
    return () =>{

    }
  },[rows])

  useEffect(() =>{

    return () =>{}
  },[changeRows])

  
function CustomFooter (props) {

  return (
    <GridFooterContainer>
      {/* Add what you want here */}

      <Typography variant ="h6" style ={{marginLeft: '.5rem'}}>Grade point average: {props.CustomFooter}</Typography>
      {/* <GridFooter sx={{
        border: 'none', // To delete double border.
        }} /> */}
    </GridFooterContainer>
  );
}

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const gradesClick = (event) =>{

}
console.log(sectionandsemester)
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
             <h2 className ='font-nunito font-bold'>Grades</h2>
             <Paper elevation={1} sx ={{width:'500 ', p: '1.5rem', m:'1rem'}} className ="rounded-xl">
             <Typography variant ="h6">{sectionandsemester}</Typography>
               {/* <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        color="text.primary"
      >
        <Link underline="hover" key="1" color="inherit" href="/" onClick={() => navigate("/student-portal/grades", {replace: true})}>
      Grades
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>, 
      </Breadcrumbs>

*/} <DataGrid 
components={{ LoadingOverlay: LinearProgress, Toolbar: CustomToolbarSubject, Footer: CustomFooter,}} loading = {loading} rows = {rows} columns={columns} autoHeight style ={{marginTop: '1.5rem'}}
componentsProps = {{footer : {CustomFooter : gpa.toFixed(2)}}}
/> 
      
      <Divider  className ="m-4"/>
      <Typography   variant = "h6">Legends</Typography>
<Stack direction ="row" divider={<Divider orientation="vertical" flexItem />} spacing = {6}>



<Stack >
<Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif ">1.00 - Excellent = 96.72 - 100</Typography>
      </Stack> 
      <Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif">1.25 - Superior = 93.38 - 96.71</Typography>
      </Stack>
      
      <Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif">1.50 - Very Good = 90.04 - 93.37</Typography>
      </Stack>

      <Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif">1.75 - Good = 86.70 - 90.03</Typography>
      </Stack>
</Stack>

<Stack spacing = {2}>

      <Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif">2.00 - Very Satisfactory = 83.36 - 86.69</Typography>
      </Stack>

      <Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif">2.25 - Satisfactory = 80.02 - 83.35</Typography>
      </Stack>

      <Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif">2.50 - Moderately Satisfactory = 76.68 - 80.01</Typography>
      </Stack>

   
      </Stack>   

<Stack >
<Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif">2.75 - Fair = 73.34 - 76.67</Typography>
      </Stack>

      <Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif">3.00 - Passed = 70.00 - 73.33</Typography>
      </Stack>

      <Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif">4.00 - Conditional Failure = 66.77 - 69.99</Typography>
      </Stack>
      <Stack spacing = {2}>
        <Typography variant ="body" className ="mt-4 font-serif">5.00 - Failed = 66.77</Typography>
      </Stack>
</Stack>

</Stack>

<Stack>
  </Stack>      


    
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

const columns = [
  {
    field: 'subject_name',
    headerName: 'Subject code',
    width: 400,
   editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 450,
   editable: false,
  },
    {
        field: 'grade',
        headerName: 'Grade',
        width: 350,
        editable: false,
      },
];





//Toolbar
function CustomToolbarSubject() {
  //Open add form
  const  formOpenType = useSelector(state => state.addFormSub.value);
  //dispatch from redux
const dispatch = useDispatch();
const [courses, setCourses] = useState({data: []});
const [updatedCourse, setUpdatedCourse] = useState(false);
//  Get all users api
 useEffect( () => {
  console.log('UseEffect called')
  const getAllData = async () =>{
     try{ 
       //online api
         const sendRequest = await fetch(basedUrl+"/course-active.php");
         const getResponse = await sendRequest.json();
    
         if(getResponse.statusCode === 201){
         
         }else{
           //if succesfully retrieve data'
          //  console.log(getResponse)
           setCourses({data: getResponse});
            
         }
     }catch(e){
       console.error(e)
     }
   }
   getAllData();
 }, [formOpenType]);

 useEffect(() => {
  if(courses.data.length > 0){
    console.log("Courses data = "+JSON.stringify(courses));
    setUpdatedCourse(true)
  }
 }, [formOpenType, courses]);


  return (<>
    <GridToolbarContainer sx={{justifyContent: 'flex-end'}}>
      <GridToolbarExport 
      printOptions={{
      fileName: 'StudentGrade',
      hideToolbar: true,
  }}

  csvOptions={{
    fileName: 'StudentGrade',
    delimiter: ';',
    utf8WithBom: true,
  }}
  />
    </GridToolbarContainer>

  </>
  );
}