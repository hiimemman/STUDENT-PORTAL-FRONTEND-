import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar,MenuItem, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AddEmployee } from '../forms/AddEmployee';
import { useSelector, useDispatch } from 'react-redux';
import { ADDEMPLOYEE } from '../slice/AddFormSlice/AddEmployeeSlice/AddEmployeeSlice';
import {PUT_EMPLOYEE} from '../slice/FormSelectedRow/EmployeeSelected'
import { basedUrl } from '../base-url/based-url'
import { useEffect, useState, useCallback, useRef } from 'react';
import { imageBaseUrl } from '../base-url/based-url';
import { NoRowBackground } from '../component/NoRowBackground';
//Toolbar
function CustomToolbar() {

  //dispatch from redux
const dispatch = useDispatch();

//Open add form
const  formOpenType = useSelector(state => state.addForm.value);

 //Open Add form
const openPopper = () =>{
  dispatch(ADDEMPLOYEE());
} 

  return (<>
    <GridToolbarContainer>
      <Button variant="text"  color ="success" startIcon = {<PersonAddIcon />} onClick = {openPopper}> Add</Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
    <AddEmployee  open ={formOpenType === 'employee'}/> 
  </>
  );
}



  const useFakeMutation = () => {
    return useCallback(
      (user) =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (user.name?.trim() === '') {
              reject();
            } else {
              resolve(user);
            }
          }, 200),
        ),
      [],
    );
  };
  
  function computeMutation(newRow, oldRow) {
    if (newRow.position !== oldRow.position) {
     
      return `Position from '${oldRow.position}' to '${newRow.position}'`;
    }
    if (newRow.status !== oldRow.status) {
     
      return `Status from '${oldRow.status}' to '${newRow.status}'`;
    }
    return null;
  }

export function EmployeeTable() {
    //dispatch from redux
const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [loading, isLoading] = useState(false);

    //Selected Employee
  const employee = useSelector(state => state.employeeSelected.value);
  
  //Current User Session
  const user = useSelector(state => JSON.parse(state.user.session));
  
    //Open add form
const  formOpenType = useSelector(state => state.addForm.value);

const mutateRow = useFakeMutation();

  const noButtonRef = useRef(null);

  const [promiseArguments, setPromiseArguments] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);


    //Handeclose snackbar
  const handleClose = () =>{
    
  }
  // Get all users api
  useEffect( () => {
    
    const getAllEmployee = async () =>{
      try{ 
        isLoading(true)
        //online api
          const sendRequest = await fetch(basedUrl+"/employee-table.php");
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
  }, [setRows,formOpenType]);
 

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
        sx={{ height: 1 , width: 150}}
        autoFocus
      >
        <MenuItem value ={'Admin'}>Admin</MenuItem>
        <MenuItem value ={'Registrar'}>Registrar</MenuItem>
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
      console.log(event.target.value)
    
    };
  
    return (
      <>
        <Select
        value={value}
        onChange={handleChange}

        sx={{ height: 1 , width: 170}}

        autoFocus
      > 
      <MenuItem value ={'active'}><CheckIcon/>active</MenuItem>
      <MenuItem value ={'inactive'}><CloseIcon/>inactive</MenuItem>
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
      flex: 1,
      minWidth: 0,
      renderCell: (params) => {
      
        return (
          <>
            <Avatar src={imageBaseUrl+params.value} />
          </>
        );
      }
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      flex: 1,
      minWidth: 0,
      valueGetter: (params) =>
        `${params.row.firstname || ''} ${params.row.middlename || ''} ${params.row.lastname || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
        minWidth: 0,
      editable: false,
      },
      {
        field: 'position',
        headerName: 'Position',
        renderEditCell: renderEditPosition,
        flex: 1,
        minWidth: 0,
        editable: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        renderEditCell: renderEditStatus,
        flex: 1,
        minWidth: 0,
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
        field: 'datehired',
        headerName: 'Date Hired',
        flex: 1,
        minWidth: 0,
        type: 'date',
        editable: false,
      },
  ];

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );


  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;
    try {
      // Make the HTTP request to save in the backend
      const dataUpdate = new FormData();
     
      dataUpdate.append('About', newRow['about']);
      dataUpdate.append('Birthday', newRow['birthday']);
      dataUpdate.append('Contact', newRow['contact']);
      dataUpdate.append('Firstname', newRow['firstname']);
      dataUpdate.append('Lastname', newRow['lastname']);
      dataUpdate.append('Middlename', newRow['middlename']);
      dataUpdate.append('Position', newRow['position']);
      dataUpdate.append('Sex', newRow['sex']);
      dataUpdate.append('Status', newRow['status']);
      dataUpdate.append('Twitter', newRow['twitterprofile']);
      dataUpdate.append('LinkedIn', newRow['linkedinprofile']);
      dataUpdate.append('Facebook', newRow['facebookprofile']);
      dataUpdate.append('Instagram', newRow['instagramprofile']);
      dataUpdate.append('Email', newRow['email']);
      dataUpdate.append('Action', 'Update');
      dataUpdate.append('EditorPosition', user.position);
      dataUpdate.append('EditorEmail', user.email);
      dataUpdate.append('Category', 'Employee');
      const sendRequest = await fetch(basedUrl+"/employee-update.php",{
        method: "POST",
        body: dataUpdate,
    });
    const response = await mutateRow(newRow);
    const getResponse = await sendRequest.json();
    console.log(getResponse.statusCode);
    if(getResponse.statusCode !== 201){
      setSnackbar({ children: 'Update successfully', severity: 'success' });
      resolve(response);
      setPromiseArguments(null);
    }else{
      setSnackbar({ children: "Field can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
    } catch (error) {
      setSnackbar({ children: "Field can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      console.log(!promiseArguments)
      return null;
    }
    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  return(
    <>
    {renderConfirmDialog()}
    <DataGrid components={{ Toolbar: CustomToolbar, LoadingOverlay: LinearProgress, NoResultsOverlay: () => (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <NoRowBackground  />
      </Stack>
    ), }} loading = {loading} rows = {rows} columns={columns}  experimentalFeatures={{ newEditingApi: true }} style ={{height:'500px'}}
      processRowUpdate={processRowUpdate}
      onSelectionModelChange={(ids) => {
      const selectedIDs = new Set(ids);
      const selectedRowData = rows.filter((row) =>
        selectedIDs.has(row.id.toString())
      );
      dispatch(PUT_EMPLOYEE(selectedRowData[0]))
    }}
    /> 
{!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}