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
import { DataGrid, GridToolbar, useGridApiContext  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

//Drowdown cell
function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 , width: 150}}
      native
      autoFocus
    >
      <option>Admin</option>
      <option>Registrar</option>
    </Select>
  );
}

SelectEditInputCell.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderSelectEditInputCell = (params) => {
  return <SelectEditInputCell {...params} />;
};


const columns = [
  {
    field: 'profile_url',
    headerName: 'Photo',
    width: 110,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 200,
    valueGetter: (params) =>
      `${params.row.firstname || ''} ${params.row.middlename || ''} ${params.row.lastname || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    type: 'email',
    editable: true,
    },
    {
      field: 'position',
      headerName: 'Position',
      renderEditCell: renderSelectEditInputCell,
      width: 150,
      editable: true,
    },
    {
      field: 'birthday',
      headerName: 'Birth Date',
      width: 150,
      type: 'date',
      editable: true,
    },
];


export  function Employees() {

  const [rows, setRows] = useState([]);
  const [loading, isLoading] = useState(false);

// Get all users api
useEffect( () => {
  const getAllEmployee = async () =>{
    try{ 
      isLoading(true)
      //online api
        const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/employee-table.php");
        const getResponse = await sendRequest.json();
        isLoading(false)
        if(getResponse.statusCode === 201){
          console.log("error");
        }else{
          //if succesfully retrieve data
          isLoading(false)
          setRows(getResponse);
        }
    }catch(e){
      console.error(e)
    }
  }

  getAllEmployee();
}, []);

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
       <Paper elevation={3}
  style={{
    width: '100%',
    padding: 20,
    marginTop: 70,
    marginRight: 20,
    borderRadius: 10,
  }}>

       <div className="flex flex-col justify-evenly">
             <h2 className ='font-nunito font-bold'>Employees</h2>
             <div style={{ height: 400, width: '100%' }}>
             <DataGrid components={{ Toolbar: GridToolbar, LoadingOverlay: LinearProgress, }} loading = {loading} rows = {rows} columns={columns}  experimentalFeatures={{ newEditingApi: true }}/>
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