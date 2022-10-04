import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector, useDispatch } from 'react-redux';
import { basedUrl } from '../base-url/based-url'
import { AddSubject } from '../forms/AddSubject';
import { ADDSUBJECT } from '../slice/AddFormSlice/AddSubjectSlice/AddSubjectSlice';




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
  if (newRow.subject_name !== oldRow.subject_name) {
   
    return `Subject name from '${oldRow.subject_name}' to '${newRow.subject_name}'`;
  }
  if (newRow.status !== oldRow.status) {
   
    return `Status from '${oldRow.status}' to '${newRow.status}'`;
  }
  if (newRow.units !== oldRow.units) {
  
    return `Units from '${oldRow.units || ''}' to '${newRow.units || ''}'`;
  }
  if (newRow.amount !== oldRow.amount) {
  
    return `Amount from '${oldRow.amount || ''}' to '${newRow.amount || ''}'`;
  }
  return null;
}

export function SubjectTable() {  
    //dispatch from redux
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [loading, isLoading] = useState(false);

    const mutateRow = useFakeMutation();

  const noButtonRef = useRef(null);

  const [promiseArguments, setPromiseArguments] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);


  //Selected sub
  const [selectedSub, setSelectedSub] = useState(null);

    //Open add form
const  formOpenType = useSelector(state => state.addForm.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

   
  // Get all users api
  useEffect( () => {
    
    const getAllEmployee = async () =>{
      try{ 
        isLoading(true)
        //online api
          const sendRequest = await fetch(basedUrl+"/subject-table.php");
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
 

  
//Edit status via cell
function EditStatus(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();
  
  const handleChange = async(event) =>{
    
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      apiRef.current.stopCellEditMode({ id, field });
  
}

  return (
    <>
      <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 , width: 260}}
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
      field: 'subject_code',
      headerName: 'Subject code',
      width: 250,
     editable: false,
    },
    {
        field: 'subject_name',
        headerName: 'Subject name',
        width: 250,
        editable: true,
      },
      {
        field: 'units',
        headerName: 'Units',
        width: 150,
        type: 'number',
        editable: true,
      },
      {
        field: 'amount',
        headerName: 'Amount',
        width: 200,
        type: 'number',
        editable: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        renderEditCell: renderEditStatus,
        width: 260,
        editable: true,
        renderCell: (cellValues) => {
          return(
          <>
        {cellValues.value == "active" ? (<Chip icon={<CheckIcon/>} label="active  " color ="success" size = "small" variant = "outlined"/>) : (<Chip icon={<CloseIcon/>} label="inactive" color ="error" size = "small" variant = "outlined"/>)}

          </>
          );//end of return
        }
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
      dataUpdate.append('ID', newRow['id']);
      dataUpdate.append('Subject_Code', newRow['subject_code']);
      dataUpdate.append('Subject_Name', newRow['subject_name']);
      dataUpdate.append('Units', newRow['units']);
      dataUpdate.append('Amount', newRow['amount']);
      dataUpdate.append('Status', newRow['status']);
      dataUpdate.append('Action', 'Update');
      dataUpdate.append('EditorPosition', user.position);
      dataUpdate.append('EditorEmail', user.email);
      dataUpdate.append('Category', 'Subject');
      const response = await mutateRow(newRow);
      const sendRequest = await fetch(basedUrl+"/subject-update.php",{
        method: "POST",
        body: dataUpdate,
    });
    
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
    <DataGrid components={{ Toolbar: CustomToolbar, LoadingOverlay: LinearProgress, }} loading = {loading} rows = {rows} columns={columns}  experimentalFeatures={{ newEditingApi: true }} style ={{height:'500px'}}
     processRowUpdate={processRowUpdate}
    /> 
 {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );

}

//Toolbar
function CustomToolbar() {

    //dispatch from redux
const dispatch = useDispatch();

//Open add form
const  formOpenType = useSelector(state => state.addFormSub.value);

 //Open Add form
const openPopper = () =>{
  dispatch(ADDSUBJECT());
} 
    return (<>
      <GridToolbarContainer>
        <Button variant="text" startIcon = {<PersonAddIcon />} onClick = {openPopper}> Add</Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
      <AddSubject open = {formOpenType === 'subject' } />
    </>
    );
  }