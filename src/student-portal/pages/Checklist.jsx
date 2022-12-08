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

import { CURRICULUM } from '../../slice/StudentPageSlice/StudentPageSlice';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { basedUrl } from '../../base-url/based-url';

import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

export function Checklist(){

     //UseNavigate
     const navigate = useNavigate();

     const dispatch = useDispatch();
     //get student
     const studentSession = useSelector(state => JSON.parse(state.student.session))

     const [loading, isLoading] = useState(false);

     const [rows, setRows] = useState({});

     const currentPage = useSelector(state =>  (state.studentSelectedPage.value));

     useEffect(()=>{
      let isCancelled = false;
      dispatch(CURRICULUM());
      return() => {isCancelled = true}
     })

    useEffect(() =>{
        if(studentSession === null){
         navigate('/student-portal')
        } 
       },[navigate, studentSession]);

       const [year, setYear] = useState('1st year');


       

       const [currentAcademicYear, setCurrentAcademicYear] = useState(null);
       const [currentSemester, setCurrentSemester] = useState(null);

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
       },[currentPage])
       useEffect(() =>{
console.log(currentSemester)
          return () =>{

          }
       },[currentSemester])
console.log(currentAcademicYear)
       useEffect(() =>{
        return () =>{}
       },[currentAcademicYear])


       const getAllData = async () =>{
        isLoading(true)
        console.log(year)
        try{ 
          const data = new FormData();
          data.append('Course', studentSession.course);
          data.append('Year', year);
          data.append('Semester', currentSemester)
      
          //online api
             const sendRequest = await fetch(basedUrl+"/curriculum-per-year.php",{
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
              console.log(getResponse)
              setRows(getResponse);
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
  },[year]);

  useEffect(() =>{
    getAllData();
return () => {}
  },[currentPage, currentSemester])

  useEffect(() =>{
    console.log(rows)
return () => {}
  },[rows])

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
             <h2 className ='font-nunito font-bold'>Checklist</h2>
             <Paper elevation={1} sx ={{width:'500 ', p: '1.5rem' , m:'1rem'}} className ="rounded-xl">
              <Stack direction ="row" spacing = {2}>
                <Typography variant ={'h3'}>{studentSession.course}</Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={year}
          label="Year"
          onChange={handleChange}
        >
          <MenuItem value={'1st year'}>1st year</MenuItem>
          <MenuItem value={'2nd year'}>2nd year</MenuItem>
          <MenuItem value={'3rd year'}>3rd year</MenuItem>
          <MenuItem value={'4th year'}>4th year</MenuItem>
        </Select>
      </FormControl>
              </Stack>
       
         <DataGrid  components={{ LoadingOverlay: LinearProgress, Footer: CustomFooterStatusComponent}} loading = {loading} rows = {rows} columns={columns} autoHeight style ={{marginTop: '1.5rem'}}
    /> 
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
    field: 'subject_code',
    headerName: 'Subject code',
    flex: 1,
    minWidth: 0,
   editable: false,
  },
  {
      field: 'subject_name',
      headerName: 'Subject name',
      flex: 1,
  minWidth: 350,
      editable: false,
    },
    {
      field: 'units',
      headerName: 'Units',
      flex: 1,
  minWidth: 0,
      type: 'number',
      editable: false,
    },
    {
      field: 'type',
      headerName: 'Subject Type',
      flex: 1,
      minWidth: 0,
      editable: false,
    },
    {
      field: 'year_available',
      headerName: 'Year',
      flex: 1,
      minWidth: 0,
      editable: false,
    },
    {
      field: 'semester_available',
      headerName: 'Semester',
      flex: 1,
      minWidth: 0,
      editable: false,
    },
];