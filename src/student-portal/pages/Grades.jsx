import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StudentDrawerAppBar } from '../component/StudentDrawerAppBar';
import { CssBaseline, Divider, Paper, Stack, } from '@mui/material';
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
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
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


export function Grades(){

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
              setRows(getResponse.content);
            }
        }catch(e){
          console.error(e)
        }
      }

     useEffect(()=>{
      let isCancelled = false;
      dispatch(GRADES());
      return() => {isCancelled = true}
     })

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
          data.append('StudentId', studentSession.studentnumber);
      
          //online api
             const sendRequest = await fetch(basedUrl+"/get-all-grades-collection.php",{
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

  function CustomFooterStatusComponent (){
    return(<></>)
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
          {/*  
               <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        color="text.primary"
      >
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
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
      */}
      
{rows.length > 0 ? ( 
    rows.map((grades) =>
<Button fullWidth style = {{marginBottom: '1rem'}}variant="outlined"  color ="success" startIcon={<FolderOpenIcon />} onClick ={ () => navigate(""+grades.student_id+"/"+grades.sectionandsemester)}>
    <Typography variant ={'h6'}>
    {grades.sectionandsemester}
    </Typography>
    
      </Button>)) : null}
     
     

    
         
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
    width: 150,
   editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
   editable: false,
  },
  
    {
      field: 'schedule_day',
      headerName: 'Days',
      width: 150,
      editable: false,
    },
    {
      field: 'schedule_time',
      headerName: 'Time',
      width: 350,
      editable: false,
    },
    {
      field: 'section_name',
      headerName: 'Section',
      width: 150,
      editable: false,
    },
    {
      field: 'professor_initial',
      headerName: 'Professor',
      width: 150,
      editable: false,
    },
];