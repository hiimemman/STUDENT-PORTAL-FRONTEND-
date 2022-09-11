
import * as React from 'react';
import { DataGrid, GridToolbar, useGridApiContext  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';

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
        sx={{ height: 1 , width: 150}}
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
      width: 80,
      renderCell: (params) => {
        console.log(params.value);
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
      width: 220,
      valueGetter: (params) =>
        `${params.row.firstname || ''} ${params.row.middlename || ''} ${params.row.lastname || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: true,
      renderCell: (cellValues) => {
        return(
          <a href={cellValues.value}>{cellValues.value}</a>
        );
      }
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
        width: 150,
        type: 'date',
        editable: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        renderEditCell: renderEditStatus,
        width: 140,
        editable: true,
        renderCell: (cellValues) => {
          console.log(cellValues.value)
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
        width: 200,
        type: 'date',
        editable: false,
      },
  ];

export function EmployeeTable() {
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
            console.log(getResponse)
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
 
  return(
    <DataGrid components={{ Toolbar: GridToolbar, LoadingOverlay: LinearProgress, }} loading = {loading} rows = {rows} columns={columns}  experimentalFeatures={{ newEditingApi: true }}/> 
  );
}