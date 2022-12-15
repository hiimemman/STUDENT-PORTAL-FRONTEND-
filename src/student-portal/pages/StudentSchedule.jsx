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

import { SCHEDULE } from '../../slice/StudentPageSlice/StudentPageSlice';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { basedUrl } from '../../base-url/based-url';

import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export function StudentSchedule(){

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
     const currentPage = useSelector(state =>  (state.studentSelectedPage.value));

     useEffect(()=>{
      let isCancelled = false;
      dispatch(SCHEDULE());
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
          data.append('SectionAndSemester', studentSession.section)

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
             <h2 className ='font-nunito font-bold'>Schedule</h2>
             <Paper elevation={1} sx ={{width:'500 ', p: '1.5rem', m:'1rem'}} className ="rounded-xl">
           
                <Typography variant ={'h6'} className ="font-bold">Subjects for {
                  changeRows === true ? (rows[0].semester+" "+rows[0].academic_year) : ''
                }</Typography>
             
          
              <Alert severity="info" style ={{marginTop:'1.5rem', marginBottom: '1.5rem'}} >
        <AlertTitle className ="font-semibold">Reminder</AlertTitle>
        Assigned shedule, instructor and other information in the table may change without prior notice.
      </Alert>
      {console.log(rows.length)}
      {rows.length < 0 ?  'No schedule found' : studentSession.type === 'Regular' ? (<DataGrid
components={{ LoadingOverlay: LinearProgress, Footer: CustomFooterStatusComponent}}
loading = {loading}
        rows={rows}
        columns={columns}
       autoHeight
      />) : <DataGrid
      components={{ LoadingOverlay: LinearProgress, Footer: CustomFooterStatusComponent}}
      loading = {loading}
              rows={rows}
              columns={columnsIrreg}
             autoHeight
            />}
        
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
    flex: 1,
    minWidth: 0,
   editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    minWidth: 300,
   editable: false,
  },
  
    {
      field: 'schedule_day',
      headerName: 'Days',
      flex: 1,
      minWidth: 0, 
      editable: false,
    },
    {
      field: 'schedule_time',
      headerName: 'Time',
      flex: 1,
      minWidth: 350,
      editable: false,
    },
    {
      field: 'section_name',
      headerName: 'Section',
      flex: 1,
  minWidth: 0,
      editable: false,
    },
    {
      field: 'professor_initial',
      headerName: 'Professor',
      flex: 1,
  minWidth: 0,
      editable: false,
    },
];


const columnsIrreg = [
  {
    field: 'subject_name',
    headerName: 'Subject code',
    flex: 1,
    minWidth: 0,
   editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    minWidth: 300,
   editable: false,
  },
  
    {
      field: 'schedule_day',
      headerName: 'Days',
      flex: 1,
      minWidth: 0, 
      editable: false,
      valueGetter: (params) => 'TBA'
    },
    {
      field: 'schedule_time',
      headerName: 'Time',
      flex: 1,
      minWidth: 350,
      editable: false,
      valueGetter: (params) => 'TBA'
    },
    {
      field: 'section_name',
      headerName: 'Section',
      flex: 1,
  minWidth: 0,
      editable: false,
    },
    {
      field: 'professor_initial',
      headerName: 'Professor',
      flex: 1,
  minWidth: 0,
      editable: false,
    },
];