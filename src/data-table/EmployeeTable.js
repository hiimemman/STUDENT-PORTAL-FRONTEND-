import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AddForm } from '../forms/AddForm';
import { useSelector, useDispatch } from 'react-redux';
import {OPEN, CLOSE} from '../slice/FormSlice/FormSlice'
import {EMPLOYEE} from '../slice/FormType/FormType'
import {PUT_EMPLOYEE} from '../slice/FormSelectedRow/EmployeeSelected'

//Toolbar
function CustomToolbar() {

  //dispatch from redux
const dispatch = useDispatch();

 //Current session user
 const formState = useSelector(state => (state.isOpenForm.value));
 //Open Popper
const openPopper = () =>{
  dispatch(EMPLOYEE());
  dispatch(OPEN());
} 


  return (<>
  <AddForm  open ={formState}/> 
    <GridToolbarContainer>
      <Button variant="text" startIcon = {<PersonAddIcon />} onClick = {openPopper}> Add</Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  </>
  );
}

//Edit Position
function EditPosition(props) {
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
        sx={{ height: 1 , width: 170}}
        native
        autoFocus
      >
        <option>Admin</option>
        <option>Registrar</option>
      </Select>
    );
  }
  
  EditPosition.propTypes = {
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
  
  const renderEditPosition = (params) => {
    return <EditPosition {...params} />;
  };
  // End of edit position via cell
  
  //Edit status via cell
  function EditStatus(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
  
    const handleChange = async (event) => {
      await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      apiRef.current.stopCellEditMode({ id, field });
    };
  
    return (
      <>
        <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ height: 1 , width: 170}}
        native
        autoFocus
      >
        <option><CheckIcon/>active</option>
        <option><CloseIcon />inactive</option>
      </Select>
      </>
    
    );
  }
  
  EditStatus.propTypes = {
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
  
  const renderEditStatus = (params) => {
    return <EditStatus {...params} />;
  };
  //End of edit status via cell
  
  const columns = [
    {
      field: 'profile_url',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => {
      
        return (
          <>
            <Avatar src={params.value} />
          </>
        );
      }
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 240,
      valueGetter: (params) =>
        `${params.row.firstname || ''} ${params.row.middlename || ''} ${params.row.lastname || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      editable: false,
      },
      {
        field: 'position',
        headerName: 'Position',
        renderEditCell: renderEditPosition,
        width: 170,
        editable: true,
      },
      {
        field: 'birthday',
        headerName: 'Birth Date',
        width: 170,
        type: 'date',
        editable: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        renderEditCell: renderEditStatus,
        width: 160,
        editable: true,
        renderCell: (cellValues) => {
          
          return(
          <>
        {cellValues.value == "active" ? (<Chip icon={<CheckIcon/>} label="active  " color ="success" size = "small" variant = "outlined"/>) : (<Chip icon={<CloseIcon/>} label="inactive" color ="error" size = "small" variant = "outlined"/>)}
              
        
          </>
          );//end of return
        }
      },

      {
        field: 'added_at',
        headerName: 'Date Created',
        width: 190,
        type: 'date',
        editable: false,
      },
  ];

export function EmployeeTable() {
    //dispatch from redux
const dispatch = useDispatch();
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
  }, [setRows]);
 
  return(
    <>
    <DataGrid components={{ Toolbar: CustomToolbar, LoadingOverlay: LinearProgress, }} loading = {loading} rows = {rows} columns={columns}  experimentalFeatures={{ newEditingApi: true }} style ={{height:'500px'}}
      onSelectionModelChange={(ids) => {
      const selectedIDs = new Set(ids);
      const selectedRowData = rows.filter((row) =>
        selectedIDs.has(row.id.toString())
      );
      dispatch(PUT_EMPLOYEE(selectedRowData[0]))
    }}
    /> 
    </>
  );
}