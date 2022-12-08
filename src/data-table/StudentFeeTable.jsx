import * as React from 'react';
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridFooterContainer, GridFooter  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputLabel, MenuItem, OutlinedInput} from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector, useDispatch } from 'react-redux';
import { basedUrl } from '../base-url/based-url'
import { AddSubject } from '../forms/AddSubject';
import { ADDFEE } from '../slice/AddFormSlice/AddFeeSlice/AddFeeSlice';
import { useTheme } from '@mui/material/styles';
import { Stack, Box, Paper, Typography,Snackbar } from '@mui/material';
import { Suspense } from 'react';
import { PUT_SUBJECT } from '../slice/FormSelectedRow/SubjectSelected';
import { NoRowBackground } from '../component/NoRowBackground';
import { AddFee } from '../forms/AddFee';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppBar from '@mui/material/AppBar';
import { imageBaseUrl } from '../base-url/based-url';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import Masonry from '@mui/lab/Masonry';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AddCardIcon from '@mui/icons-material/AddCard';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




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
  if (newRow.totalpaid !== oldRow.totalpaid) {
   
    return `Total paid from '${oldRow.totalpaid}' to '${newRow.totalpaid}'`;
  }
  return null;
}

const columnsPaymentHistory = [
  { field: 'academicyear', headerName: 'Academic Year',  flex: 1,
  minWidth: 0, },
  { field: 'semester', headerName: 'Semester', flex: 1,
  minWidth: 0, },
  { field: 'totalfee', headerName: 'Total fee', type: "number",  flex: 1,
  minWidth: 0, },
  { field: 'totalpaid', headerName: 'Total paid',  type: "number", flex: 1,
  minWidth: 0,},
  { field: 'balance', headerName: 'Balance', type: "number", flex: 1,
  minWidth: 0,},
  { field: 'payment', headerName: 'Payment',type: "number",  flex: 1,
  minWidth: 0,},
  { field: 'date_edit', headerName: 'Date of Payment', type: "date", flex: 1,
  minWidth: 210,},
];

const columnsFee  = [
  { field: 'name', headerName: 'Fee',  flex: 1,
  minWidth: 0, },
  { field: 'amount', headerName: 'Amount',  type: "number", flex: 1,
  minWidth: 0, },
  { field: 'subtotal', headerName: 'Sub total', type: "number",  flex: 1,
  minWidth: 0, },
  { field: 'added_at', headerName: 'Date', type: "date", flex: 1,
  minWidth: 210,},
];

function LongMenu(props) {

  //Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

  const [open, setOpen] = useState(false);

  const [data, setData ] = useState({});

  const [paymentHistory, setPaymentHistory] = useState([]);
  
  const [errorPayment, setErrorPayment] = useState('');

  const [paymentText , setPaymentText] = useState('');

  const [submitLoading , setSubmitLoading] = useState(false);
  
  //Snackbar
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);


  const handleChangePayment = (event) =>{
    if(event.target.value <= 0 || event.target.value > parseFloat(data[0].balance[0].balance)){
      setErrorPayment((errorPayment => errorPayment = true))
      setPaymentText((paymentText) => paymentText = 'Payment must be between ₱1 - ₱'+data[0].balance[0].balance);
    }else{
      setErrorPayment((errorPayment => errorPayment = false))
      setPaymentText((paymentText) => paymentText = '');
      
    }
  }

  useEffect(() =>{

    return () =>{}
  },[snackbar])

  useEffect(() =>{
    return () => {}
  },[paymentText])

  useEffect(() =>{
    return () =>{}
  },[errorPayment])
  const getAllData = async () =>{


    try{ 
      const data = new FormData();
      data.append('StudentNumber', props.id.studentnumber);
      data.append('AcademicYear', props.id.academicyear);
      data.append('Semester', props.id.semester);
      //online api
        const sendRequest = await fetch(basedUrl+"/fee-student-history.php",{
          method: "POST",
          body: data,
      });
        const getResponse = await sendRequest.json();
    

        if(getResponse.statusCode === 201){
        
        }else{
          //if succesfully retrieve data
          console.log(getResponse)
          setData(data => data = [getResponse])
         
        }
    }catch(e){
      console.error(e)
    }
  }

useEffect(() =>{
  let x = 0;
  if(data.length > 0) {
   let coll = data.map((his) => his['history'].map((history) => 
    // setPaymentHistory(paymentHistory => [...paymentHistory, history])
    {
      console.log(history)
      x = parseFloat(x) + 1;
      let content = JSON.parse(history.after_edit);
      content['id'] = x;
      content['date_edit'] = history.date_edited;
      return content;
    }
  ))

  console.log(coll)
  setPaymentHistory((paymentHistory) => paymentHistory = coll[0])
  }
 
return () =>{}
},[data]);

useEffect(() =>{
  console.log(paymentHistory)
return () => {}
},[paymentHistory])



  useEffect(() =>{

    return () =>{

    }
  },[open])

  const handleClickOpen = () => {
    getAllData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) =>{ 
    event.preventDefault();
    if(!errorPayment){
      const data = new FormData(event.currentTarget);
      data.append('ID', props.id.id)
      data.append('StudentNumber', props.id.studentnumber)
      data.append('Action', 'Update');
      data.append('EditorPosition', user.position);
      data.append('EditorEmail', user.email);
      data.append('Category', 'StudentFee');
      for (var pair of data.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
  try{
    const sendRequest = await fetch(basedUrl+"/fee-per-student-update.php",{
      method: "POST",
      body: data,
  });
  
  const getResponse = await sendRequest.json();
  if(getResponse.statusCode !== 201){
    getAllData()
    setSnackbar({ children: 'Payment updated successfully', severity: 'success' });
  }else{
    setSnackbar({ children: 'Payment must be between ₱1 - ₱'+data[0].balance[0].balance, severity: 'error' });
  }
  } catch (error) {
    setSnackbar({ children: "Can't access the server", severity: 'error' });
  }
    
  }else{
    setSnackbar({ children: 'Payment must be between ₱1 - ₱'+data[0].balance[0].balance, severity: 'error' });
  }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClickOpen}
      >
        <VisibilityIcon />
         
      </IconButton>
    
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ ml: 2, flex: 1 }} component="div">
            <img src= {imageBaseUrl+"homepage-logo.svg"} alt="SVG as an image" style ={{maxWidth:"100px"}} component="div" />
    
            </Box>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
       {data.length > 0 ? (<>
        <Grid container spacing={{ xs: 1,sm:1, md: 1, lg:1 }} columns={{ xs: 1, sm: 2, md: 2, lg:2 }}>
       <Paper elevation={1} sx ={{width:'300px', m: '1rem', marginRight: '0',p: '1.5rem'}} className ="rounded-xl">
        <center> 
        <Typography variant ="h5" className="font-extrabold">STUDENT INFORMATION</Typography>
        </center>
        <Divider style = {{marginTop:'.5rem', marginBottom: '.5rem'}}/>
       <Typography variant ="h6" className = "font-mono font-extrabold" >
        Student number: {data[0].student[0].studentnumber}</Typography>
        <Stack direction ="row" spacing ={1}>
       <Typography variant ="h6" className = "font-mono font-extrabold">Full name: {data[0].student[0].firstname}</Typography>
       <Typography variant ="h6" className = "font-mono font-extrabold">{data[0].student[0].middlename}</Typography>
       <Typography variant ="h6" className = "font-mono font-extrabold">{data[0].student[0].lastname}</Typography>
       </Stack>
       <Typography variant ="h6" className = "font-mono font-extrabold">Birthday: {data[0].student[0].birthday}</Typography>
       <Typography variant ="h6" className = "font-mono font-extrabold">Course: {data[0].student[0].course}</Typography>
       <Typography variant ="h6" className = "font-mono font-extrabold">Email: {data[0].student[0].email}</Typography>
       <Typography variant ="h6" className = "font-mono font-extrabold">Type: {data[0].student[0].type}</Typography>
       <Typography variant ="h6" className = "font-mono font-extrabold">Contact: {data[0].student[0].contact}</Typography>
       <Typography variant ="h6" className = "font-mono font-extrabold">A.Y: {data[0].balance[0].academicyear}</Typography>
       <Typography variant ="h6" className = "font-mono font-extrabold">Semester: {data[0].balance[0].semester}</Typography>
       </Paper>
       <Paper elevation={1} sx ={{width:'1000px', m: '1rem', p: '1.5rem'}} className ="rounded-xl">
        <center>
        <Typography variant = "h5" className='font-extrabold'>PAYMENT HISTORY</Typography>
        </center>
        
       <DataGrid  components={{ Toolbar: CustomToolbarSubject, LoadingOverlay: LinearProgress,NoResultsOverlay: () => (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <NoRowBackground  />
      </Stack>
    ), }} autoHeight rows = {paymentHistory} columns={columnsPaymentHistory}  
    /> 
       </Paper>
       </Grid>
       <Grid container spacing={{ xs: 1,sm:1, md: 1, lg:1 }} columns={{ xs: 1, sm: 2, md: 2, lg:2 }}> 
       <Paper component="form" elevation={1} sx ={{width:'300px', m: '1rem', marginRight: '0',p: '1.5rem'}} className ="rounded-xl" onSubmit ={handleSubmit}>
        <center> 
        <Typography variant ="h5" className="font-extrabold">ACCOUNT BALANCE</Typography>
        </center>
        <Divider style = {{marginTop:'.5rem', marginBottom: '.5rem'}}/>
       <Typography variant ="h6" className = "font-mono font-extrabold" >
        TOTAL FEE: ₱ {data[0].balance[0].totalfee}</Typography>
        <Typography variant ="h6" className = "font-mono font-extrabold" >
        TOTAL PAID: ₱ {data[0].balance[0].totalpaid}</Typography>
        <Divider style = {{marginTop:'.5rem', marginBottom: '.5rem'}}/>
        <Typography variant ="h6" className = "font-mono font-extrabold" >
        BALANCE: ₱ {data[0].balance[0].balance}</Typography>
        <Divider style = {{marginTop:'.5rem', marginBottom: '.5rem'}}/>
        <TextField
        style ={{marginTop: '.5rem'}}
         fullWidth
         required
         error = {errorPayment}
          type ="number"
          id="Payment"
          label="Add Payment"
          name ="Payment"
          onChange = {handleChangePayment}
          helperText = {paymentText}
        />
      <Button type ="submit" fullWidth style ={{marginTop:'.5rem'}} variant="contained" startIcon={<AddCardIcon />}>
        Add Payment
      </Button>
       </Paper>
       <Paper elevation={1} sx ={{width:'1000px', m:'1rem', p: '1.5rem'}} className ="rounded-xl">
       <center>
        <Typography variant = "h5" className ="font-extrabold">FEE</Typography>
        </center>
       <DataGrid components={{ Toolbar: CustomToolbarSubject, Footer: CustomFooter, LoadingOverlay: LinearProgress,NoResultsOverlay: () => (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <NoRowBackground  />
      </Stack>
    ), }}
    componentsProps = {{footer : {CustomFooter : data[0].balance[0].totalfee}}}
    autoHeight rows = {data[0].fee} columns={columnsFee}  
    /> 
       </Paper>
       </Grid>
       {!!snackbar && (
        <Snackbar anchorOrigin={{ vertical:"top", horizontal: "center" }} open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
       </>
) : null}
      

      </Dialog>
    </div>
    
  );
}


export function StudentFeeTable() {  

    const [rows, setRows] = useState([]);
    const [loading, isLoading] = useState(false);

    const mutateRow = useFakeMutation();

  const noButtonRef = useRef(null);

  const [promiseArguments, setPromiseArguments] = useState(null);

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

    //Open add form
const  formOpenType = useSelector(state => state.addFormFee.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

const [courses, setCourses] = useState(null);

const [updatedCourse, setUpdateCourse] = useState('');

  // Get all users api
  useEffect( () => {
   const getAllData = async () =>{
      isLoading(true)
      try{ 
      
        //online api
          const sendRequest = await fetch(basedUrl+"/fee-per-student-table.php");
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
    getAllData();
  }, [formOpenType]);
 


   //Edit semester via cell
function EditSemester(props) {
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
   
      sx={{ height: 1 , width: 260}}
   
      autoFocus
    >
     
      <MenuItem value ={'1st semester'}>1st semester</MenuItem>
      <MenuItem value ={'2nd semester'}>2nd semester</MenuItem>
      </Select>
    </>
  
  );
}

EditSemester.propTypes = {
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

const renderEditSemester = (params) => {
  return <EditSemester {...params} />;
};
//End of edit semester via cell 

 
 //Edit year via cell
function EditYear(props) {
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
      sx={{ height: 1 , width: 260}}
      autoFocus
    >
    <MenuItem value ={'1st year'}>1st year</MenuItem>
    <MenuItem value ={'2nd year'}>2nd year</MenuItem>
    <MenuItem value ={'3rd year'}>3rd year</MenuItem>
    <MenuItem value ={'4th year'}>4th year</MenuItem>
    <MenuItem value ={'5th year'}>5th year</MenuItem>
    <MenuItem value ={'6th year'}>6th year</MenuItem>
    </Select>
    </>
  
  );
}

EditYear.propTypes = {
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

const renderEditYear = (params) => {
  return <EditYear {...params} />;
};
//End of edit year via cell 



  
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
      sx={{ height: 1 , width: 260}}
      autoFocus
    >
      <MenuItem value ={'active'}><CheckIcon/>active</MenuItem>
      <MenuItem value = {'inactive'}><CloseIcon />inactive</MenuItem>
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
        field: 'studentnumber',
        headerName: 'Student number',
        flex: 1,
        minWidth: 0,
        editable: false,
      },
      {
        field: 'academicyear',
        headerName: 'Academic Year',
        flex: 1,
        minWidth: 0,
        editable: false,
      },
      {
        field: 'semester',
        headerName: 'Semester',
        flex: 1,
        minWidth: 0,
        editable: false,
      },
      {
        field: 'totalfee',
        headerName: 'Total fee',
        flex: 1,
        minWidth: 0,
        editable: false,
      },
     
      {
        field: 'balance',
        headerName: 'Balance',
        flex: 1,
        minWidth: 0,
        editable: false,
      },
      {
        field: 'totalpaid',
        headerName: 'Total paid',
        flex: 1,
        minWidth: 0,
        editable: true,
      },
      {
        field: 'id',
        headerName: 'Actions',
        minWidth: 100,
        editable: false,
        renderCell: (cellValues) => {
          return(
          <>
        <LongMenu id ={cellValues.row} />
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
      dataUpdate.append('ID', newRow['id'])
      dataUpdate.append('StudentNumber' , newRow['studentnumber']);
      dataUpdate.append('TotalPaid', newRow['totalpaid']);
      dataUpdate.append('Action', 'Update');
      dataUpdate.append('EditorPosition', user.position);
      dataUpdate.append('EditorEmail', user.email);
      dataUpdate.append('Category', 'StudentFee');
      const response = await mutateRow(newRow);
      const sendRequest = await fetch(basedUrl+"/fee-per-student-update.php",{
        method: "POST",
        body: dataUpdate,
    });
    
    const getResponse = await sendRequest.json();
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

  useEffect(() =>{

    return () =>{}
  },[snackbar])

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
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
    <DataGrid components={{ Toolbar: CustomToolbarSubject, LoadingOverlay: LinearProgress,NoResultsOverlay: () => (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <NoRowBackground  />
      </Stack>
    ), }} loading = {loading} rows = {rows} columns={columns}  experimentalFeatures={{ newEditingApi: true }} style ={{height:'500px'}}
     processRowUpdate={processRowUpdate}
    //  onSelectionModelChange={(ids) => {
    //   const selectedIDs = new Set(ids);
    //   const selectedRowData = rows.filter((row) =>
    //     selectedIDs.has(row.id.toString())
    //   );
    //   dispatch(PUT_SUBJECT(selectedRowData[0]))
    // }}
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
 function CustomToolbarSubject() {
  //Open add form
  const  formOpenType = useSelector(state => state.addFormSub.value);
  //dispatch from redux
const dispatch = useDispatch();
const [courses, setCourses] = useState({data: []});
const [updatedCourse, setUpdatedCourse] = useState(false);
//  Get all users api
//  useEffect( () => {

//   const getAllData = async () =>{
//      try{ 
//        //online api
//          const sendRequest = await fetch(basedUrl+"/course-active");
//          const getResponse = await sendRequest.json();
    
//          if(getResponse.statusCode === 201){
         
//          }else{
//            //if succesfully retrieve data'
//           //  console.log(getResponse)
//            setCourses({data: getResponse});
            
//          }
//      }catch(e){
//        console.error(e)
//      }
//    }
//    getAllData();
//  }, [formOpenType]);


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

function CustomFooter (props) {

  return (
    <GridFooterContainer>
      {/* Add what you want here */}

      <Typography variant ="h6" style ={{marginLeft: '.5rem'}}>Total Amount: ₱ {props.CustomFooter}</Typography>
      {/* <GridFooter sx={{
        border: 'none', // To delete double border.
        }} /> */}
    </GridFooterContainer>
  );
}