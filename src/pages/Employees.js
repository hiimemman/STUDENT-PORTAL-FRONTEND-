import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Skeleton, Typography } from '@mui/material';
import { DrawerAppBar } from '../component/DrawerAppBar';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';



// const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstname',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastname',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'profile_url',
    headerName: 'Photo',
    width: 110,
  },
  {
  field: 'email',
  headerName: 'Email',
  width: 110,
  },
  {
    field: 'birthday',
    headerName: 'Birth day',
    width: 160,
    type: 'date',
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstname || ''} ${params.row.lastname || ''}`,
  },
];



export  function Employees() {

  const [rows, setRows] = useState([]);


// Get all users api
useEffect( () => {
  const getAllEmployee = async () =>{
    try{ 
      //online api
        const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/employee-table.php");
        const getResponse = await sendRequest.json();
        console.log(getResponse)
        if(getResponse.statusCode === 201){
          console.log("error");
        }else{
  setRows(getResponse);
        }
    }catch(e){
      console.error(e)
    }
  }

  getAllEmployee();
});

// const { data } = useDemoData({
//   dataSet: 'Employee',
//   visibleFields: VISIBLE_FIELDS,
//   rowLength: 100,
// });



  const theme = useTheme();

//get user
const user = useSelector(state => JSON.parse(state.user.session))

  //check menu state
  const isOpen = useSelector(state => (state.isOpen.value))

 
  //Navigate
  const navigate = useNavigate();
  useEffect(() =>{
    if(user === null){
     navigate('/LoginEmployee')
    } 
   })

  return (
    <>{user !== null ?  (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
       <DrawerAppBar />
       <Paper  elevation={3}
  style={{
    width: '100%',
    padding: 20,
    marginTop: 70,
    marginRight: 40,
  }}>


         <div className="flex flex-col justify-evenly">
             <p className ='font-nunito font-extrabold'> Employee List</p>
             <div style={{ height: 400, width: '100%' }}>
             <DataGrid rows = {rows} columns={columns} components={{ Toolbar: GridToolbar }} />
         </div>     
       </div>
    
  </Paper>
     
   </Box>) :  
   (<Skeleton
    sx={{ bgcolor: 'grey.900' }}
    variant="rectangular"
    width={1500}
    height={690}
  />
  )}
    </>
  );
}