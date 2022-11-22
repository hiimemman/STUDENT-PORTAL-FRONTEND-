
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Paper, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector, useDispatch } from 'react-redux';
import {OPEN, CLOSE} from '../slice/FormSlice/FormSlice'
import {EMPLOYEE} from '../slice/FormType/FormType'
import {employeeSelect, PUT_EMPLOYEE} from '../slice/FormSelectedRow/EmployeeSelected'
import ReactTimeAgo from 'react-time-ago'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Draggable from "react-draggable";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import RestoreIcon from '@mui/icons-material/Restore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {basedUrl} from '../base-url/based-url'

//Toolbar
function CustomToolbar() {


 //Open Popper


  return (<>
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  </>
  );
}

  const columnsHistory = [
    {
      field: 'action',
      headerName: 'Actions',
      width: 100,
      editable: false,
    },
    {
      field: 'editor_email',
      headerName: 'Editor',
      width: 220,
      editable: false,
      },
      {
        field: 'editor_position',
        headerName: 'Editor Position',
        width: 110,
      editable: false,
      },
      {
        field: 'edited_email',
        headerName: 'Subject Code',
        width: 220,
        editable: false,
      },
      {
        field: 'date_edited',
        headerName: 'Date Edited',
        width: 150,
      },

      {
        field: 'after_edit',
        headerName: 'File Saved',
        width: 300,
        editable: false,
       
      },
  ];

  
 

export function FeeHistory(){
  //Current User Session
const user = useSelector(state => JSON.parse(state.user.session));
    const [rows, setRow] = useState({});
    const [loading, isLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);


    const [openDragger, setOpenDragger] = useState(false);

    const position = { x: -10, y: -450 };

    //Selected employee history
    const [fileSave, setfileSave] = useState({});
    
       //dispatch from redux
const dispatch = useDispatch();

    //Restore Dialog Submit state
    const [submitRestore, setSubmitRestore] = useState(false);

    //Snackbar
const [openSnackbar, setOpenSnackbar] = useState(false);// for snackbar

//snackbar status
const [loginStatus, setStatus] = useState("failed");// default is failed for login atttempt alert


//Message of snackbar
const [loginMessage, setMessage ] = useState("Try again");// Default message of alert
    //Selected Employee
    const employee = useSelector(state => state.employeeSelected.value);


//Submit is Loading
const [isLoadingSubmit, setisLoadingSubmit] = useState(false);


//Get selected fileSave action
const [actionFileSave, setActionFileSave] = useState('');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const open = Boolean(anchorEl);
  const idPopper = open ? 'simple-popover' : undefined;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

    useEffect(() =>{
    const getData = async () =>{
      isLoading(true)
        const sendRequest = await fetch(basedUrl+"/fee-history.php");
        const getResponse = await sendRequest.json();
        if(getResponse === 201){
          isLoading(false)
        }else{
          isLoading(false)
           setRow(getResponse);
        }
    }
    getData();
    }, [setRow,submitRestore]);

 
    useEffect(() =>{

    },[fileSave])
    
    const restoreFile = async () =>{
      try{
        setisLoadingSubmit(true);
        const dataRestore = new FormData();
        // console.log(employee.email)
       
        dataRestore.append('ID', fileSave.id);
        dataRestore.append('Name', fileSave.name);
        dataRestore.append('Amount', fileSave.amount);
        dataRestore.append('Status', fileSave.status);
        dataRestore.append('Action', 'Restore');
        dataRestore.append('EditorPosition', user.position);
        dataRestore.append('EditorEmail', user.email);
        dataRestore.append('Category', 'Fee');
        const sendRequest = await fetch(basedUrl+"/fee-update.php",{
          method: "POST",
          body: dataRestore,
      });
  
      const getResponse = await sendRequest.json();
      if(getResponse.statusCode !== 201){
        setOpenDragger(false)
        setOpenDialog(false);
        setOpenSnackbar(true);
        setStatus("success");
        setMessage("Updated Successfully")
        setisLoadingSubmit(false);
      }else{
        // setisLoading(false);
        setOpenDragger(false)
        setOpenDialog(false);
        setOpenSnackbar(true);
        setStatus("error");
        setMessage('Error see console log for error');
        setisLoadingSubmit(false);
      }
      
      }catch(e){

      }
    }


     
       
       
 
    return(
    <>
    
    <DataGrid components={{ Toolbar: CustomToolbar, LoadingOverlay: LinearProgress, }} loading = {loading} rows = {rows} columns={columnsHistory}  experimentalFeatures={{ newEditingApi: true }} style ={{height:'500px'}}
      onSelectionModelChange={(ids) => {
      const selectedIDs = new Set(ids);
      const selectedRowData = rows.filter((row) =>
        selectedIDs.has(row.id.toString())
      );    
      setfileSave(JSON.parse(selectedRowData[0]['before_edit']));// convert object into array
      // setOpenDragger((old) => !old)
      setOpenDragger(true)
      setActionFileSave(selectedRowData[0]['action']);
}}
    /> 
    {openDragger && (
        <Draggable defaultPosition={position}>
          <Paper elevation={5} sx={{  padding:'.5rem', width: 300,
          maxHeight: 450, overflow: 'auto'}} className ="rounded-xl">
           <Grid2 container  justifyContent="end">
           {/* <Button variant="text" startIcon = {<RestoreIcon />} onClick = {restoreFile}> Restore</Button> */}
           {actionFileSave !== 'Create' ? (<IconButton placeholder ={'Close'}aria-label="delete" size="small" onClick={handleOpenDialog}>
            <RestoreIcon />
            </IconButton>) : (<></>)}
              <IconButton placeholder ={'Close'}aria-label="delete" size="small" onClick={() => setOpenDragger(false)}>
               <CloseIcon />
              </IconButton>
           </Grid2>
           <Divider />
            <Grid2 container spacing={2} sx ={{marginLeft:'0px'}}>
             <Grid2 item xs={4}><Typography variant='overline'>Name:</Typography></Grid2>
             <Grid2 item xs={4}><Typography variant='overline'>{fileSave.name}</Typography></Grid2>
            </Grid2>
            <Grid2 container spacing={2} sx ={{marginLeft:'0px'}}>
             <Grid2 item xs={4}><Typography variant='overline'>Amount:</Typography></Grid2>
             <Grid2 item xs={4}><Typography variant='overline'>{fileSave.amount}</Typography></Grid2>
            </Grid2>
            <Grid2 container spacing={2} sx ={{marginLeft:'0px'}}>
             <Grid2 item xs={4}><Typography variant='overline'>STATUS:</Typography></Grid2>
             <Grid2 item xs={4}><Typography variant='overline'>{fileSave.status}</Typography></Grid2>
            </Grid2>
          </Paper>
        </Draggable>
      )}
       <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"ARE YOU SURE YOU WANT TO RESTORE THE DATA OF "+fileSave.name+" ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Restoring may lead to human error, please think twice before you decide, Anyway you can still redo your upcoming action in history panel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={restoreFile}>
            Restore
          </Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
             <Alert onClose={handleCloseSnackbar} severity= {loginStatus} sx={{ width: '100%' }}>
                {loginMessage}
             </Alert>
       </Snackbar>
    </>);
}