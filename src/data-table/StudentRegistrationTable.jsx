
import * as React from 'react';
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, OutlinedInput, Snackbar, Typography, Box, Paper,Stack } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector, useDispatch } from 'react-redux';
import { basedUrl } from '../base-url/based-url'
import { PUT_REGISTRATION } from '../slice/FormSelectedRow/RegistrationSelected';
import { imageBaseUrl } from '../base-url/based-url';
import {ADDSTUDENT} from '../slice/AddFormSlice/AddStudentSlice/AddStudentSlice'
import { AddStudent } from '../forms/AddStudent';
import PendingIcon from '@mui/icons-material/Pending'; 
import { useNavigate} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';



import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import Masonry from '@mui/lab/Masonry';

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


const columnsSched = [
  { field: 'sched_code', headerName: 'Sched Code', flex: 1,
  minWidth: 0,  },
  { field: 'subject_name', headerName: 'Subject Name',  flex: 1,
  minWidth: 0, },
  { field: 'units', headerName: 'Units', flex: 1,
  minWidth: 0, },
  { field: 'schedule_day', headerName: 'Days',  flex: 1,
  minWidth: 0, },
  { field: 'schedule_time', headerName: 'Time',  flex: 1,
  minWidth: 0,},
  { field: 'semester', headerName: 'Semester',  flex: 1,
  minWidth: 0,},

];


const columnsFee  = [
  { field: 'name', headerName: 'Fee', flex: 1,
  minWidth: 0,  },
  { field: 'amount', headerName: 'Amount', flex: 1,
  minWidth: 0,  },
  { field: 'subtotal', headerName: 'Subtotal',  flex: 1,
  minWidth: 0, },
];

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
  if (newRow.status !== oldRow.status) {
   
    return `Status from '${oldRow.status}' to '${newRow.status}'`;
  }

  if (newRow.contact !== oldRow.contact) {
   
    return `Contact from '${oldRow.contact}' to '${newRow.contact}'`;
  }
  return null;
}

function LongMenu(props) {
  const [open, setOpen] = useState(false);

  const [data, setData ] = useState({});

 

  const getAllData = async () =>{


    try{ 
      const data = new FormData();
      data.append('ID', props.id.id);
      data.append('StudentNumber', props.id.student_id);
      data.append('SectionAndSemester', props.id.sectionandsemester)
      //online api
        const sendRequest = await fetch(basedUrl+"/view-student-pre-registration.php",{
          method: "POST",
          body: data,
      });
        const getResponse = await sendRequest.json();
    

        if(getResponse.statusCode === 201){
        
        }else{
          //if succesfully retrieve data
          setData(data => data = [getResponse])
        }
    }catch(e){
      console.error(e)
    }
  }

useEffect(() =>{
  console.log(data)
return () =>{}
},[data])
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
        {console.log(data)}
       {data.length > 0 ? (<>
       <Paper elevation={1} sx ={{width:'500 ', m: '1.5rem', p: '1.5rem'}} className ="rounded-xl">
        <center>
        <Typography variant ="h5" className="font-extrabold">STUDENT INFORMATION</Typography>
        </center>
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
       <Typography variant ="h6" className = "font-mono font-extrabold">Contact number: {data[0].student[0].contact}</Typography>
       
       </Paper>
       <Paper elevation={1} sx ={{width:'500 ', m: '1.5rem', p: '1.5rem'}} className ="rounded-xl">
        <center>
        <Typography variant = "h5" className='font-extrabold'>SCHEDULE</Typography>
        </center>
       <DataGrid autoHeight rows = {data[0].sched} columns={columnsSched}  
    /> 
       </Paper>
      
       <Paper elevation={1} sx ={{width:'500 ', m: '1.5rem', p: '1.5rem'}} className ="rounded-xl">
       <center>
        <Typography variant = "h5" className ="font-extrabold">FEE</Typography>
        </center>
       <DataGrid autoHeight rows = {data[0].fee} columns={columnsFee}  
    /> 

       </Paper>
       </>
) : null}
      

      </Dialog>
       
    </div>
  );
}

export function StudentRegistrationTable() {  
    //dispatch from redux
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [loading, isLoading] = useState(false);

    const mutateRow = useFakeMutation();

  const noButtonRef = useRef(null);

  const [promiseArguments, setPromiseArguments] = useState(null);

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

    //Open add form
const  formOpenType = useSelector(state => state.addFormStudent.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

const [faculty, setCourses] = useState(null);

const [updatedCourse, setUpdateCourse] = useState('');

  // Get all student api
  const getAllData = async () =>{
    isLoading(true)
    try{ 
    
      //online api
        const sendRequest = await fetch(basedUrl+"/student-registration-table.php");
        const getResponse = await sendRequest.json();
        console.log(getResponse)
        isLoading(false)
        if(getResponse.statusCode === 201){
        
        }else{
          //if succesfully retrieve data
          isLoading(false)
          setRows((prev) => prev = getResponse);
        }
    }catch(e){
      console.error(e)
    }
    try{ 
      //online api
        const sendRequest = await fetch(basedUrl+"/course-table.php");
        const getResponse = await sendRequest.json();
   
        if(getResponse.statusCode === 201){
        
        }else{
          //if succesfully retrieve data'
           setCourses(getResponse);
           
        }
    }catch(e){
      console.error(e)
    }
  }
  useEffect( () => {
  
    getAllData();

    return () =>{
        //exit in memory
    }
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
      size="small"
      sx={{ height: 1 , width: 260}}
      native
      autoFocus
    >
      <option>1st semester</option>
      <option>2nd semester</option>
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
      size="small"
      sx={{ height: 1 , width: 260}}
      native
      autoFocus
    >
      <option>1st year</option>
      <option>2nd year</option>
      <option>3rd year</option>
      <option>4th year</option>
      <option>5th year</option>
      <option>6th year</option>

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

      sx={{ height: 1 , width: 250}}

      autoFocus
    >
      
      <MenuItem value ={'confirmed'}><CheckIcon/>confirmed</MenuItem>
      <MenuItem value ={'pending'}><PendingIcon />pending</MenuItem>
      <MenuItem value = {'decline'}><CloseIcon />decline</MenuItem>
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
        maxWidth: 100,
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
            field: 'student_id',
            headerName: 'Student Id',
            flex: 1,
            minWidth: 100,
            type: "number",
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
        field: 'sectionandsemester',
        headerName: 'Section and Semester',
        flex: 1,
        minWidth: 350,
        editable: false,
},

      {
        field: 'status',
        headerName: 'Status',
        renderEditCell: renderEditStatus,
        flex: 1,
        minWidth: 130,
        maxWidth: 130,
        editable: true,
        renderCell: (cellValues) => {
          return(
          <>
        {cellValues.value == "confirmed" ? (<Chip icon={<CheckIcon/>} label="confirmed  " color ="success" size = "small" variant = "outlined"/>) : null}
        {cellValues.value == "pending" ? (<Chip icon={<PendingIcon/>} label="pending" color ="info" size = "small" variant = "outlined"/>) : null}
        {cellValues.value == "decline" ? (<Chip icon={<CloseIcon/>} label="decline" color ="error" size = "small" variant = "outlined"/>) : null}
          </>
          );//end of return
        }
      },
      {
        field: 'id',
        headerName: 'Actions',
        width: 100,
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
      console.log(newRow['student_id'])
      dataUpdate.append('ID', newRow['id']);
      dataUpdate.append('Status', newRow['status']);
      dataUpdate.append('Section', newRow['sectionandsemester']);
      dataUpdate.append('StudentId', newRow['student_id']);
      dataUpdate.append('Semester', newRow['semester']);
      dataUpdate.append('AcademicYear', newRow['academicyear']);
      dataUpdate.append('Action', 'Update');
      dataUpdate.append('EditorPosition', user.position);
      dataUpdate.append('EditorEmail', user.email);
      dataUpdate.append('Category', 'StudentRegistration');
      const response = await mutateRow(newRow);
      for(var pair of dataUpdate.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
    }

      const sendRequest = await fetch(basedUrl+"/student-registration-edit.php",{
        method: "POST",
        body: dataUpdate,
    });
    
    const getResponse = await sendRequest.json();
    console.log(getResponse)
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
        console.error(error)
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
      return null;
    }
    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);
    console.log(rows)
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
    <DataGrid components={{ Toolbar: CustomToolbarProfessor, LoadingOverlay: LinearProgress, }} loading = {loading} rows = {rows} columns={columns}  experimentalFeatures={{ newEditingApi: true }} style ={{height:'500px'}}
     processRowUpdate={processRowUpdate}
     onSelectionModelChange={(ids) => {
      const selectedIDs = new Set(ids);
      const selectedRowData = rows.filter((row) =>
        selectedIDs.has(row.id.toString())
      );
      dispatch(PUT_REGISTRATION(selectedRowData[0]))
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

 //Toolbar
 function CustomToolbarProfessor() {
  //Open add form
  const  formOpenType = useSelector(state => state.addFormStudent.value);
  //dispatch from redux
const dispatch = useDispatch();
const [faculty, setFaculty] = useState({data: []});
const [course, setCourse] = useState({data: []});
const [section, setSection] = useState({data: []});
const [fourDigits, setFourDigits] = useState({data: '0000'});
const [updatedFaculty, setUpdatedFaculty] = useState(false);
const currentYear = new Date().getFullYear().toString().substr(0, 2);

//  Get all users api

useEffect( () => {
  const getAllData = async () =>{
     try{ 
       //online api
         const sendRequest = await fetch(basedUrl+"/faculty-active.php");
         const getResponse = await sendRequest.json();
    
         if(getResponse.statusCode === 201){
         
         }else{
           //if succesfully retrieve data'
          //  console.log(getResponse)
           setFaculty({data: getResponse});
            
         }
     }catch(e){
       console.error(e)
     }
   }
   getAllData();
 }, [formOpenType]);

 
 const generateFourDigit = async () =>{
  try{ 
    //online api
      const sendRequest = await fetch(basedUrl+"/student-number-4digit-generate.php");
      const getResponse = await sendRequest.json();
      console.log(getResponse.statusCode)
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data'
       //  console.log(getResponse)
       if(parseFloat(getResponse.statusCode) < 10){
       
        setFourDigits((fourDigits) => fourDigits = {...fourDigits, data: '000'+getResponse.statusCode});  
        return;
       }
       
       if(parseFloat(getResponse.statusCode) < 100){
        setFourDigits((fourDigits) => fourDigits = {...fourDigits, data: '00'+getResponse.statusCode});  
        return;
       }
       if(parseFloat(getResponse.statusCode) < 1000){   
        setFourDigits((fourDigits) => fourDigits = {...fourDigits, data: '0'+getResponse.statusCode});  
        return;
       }
       if(parseFloat(getResponse.statusCode) > 999){
        setFourDigits((fourDigits) => fourDigits = {...fourDigits, data: getResponse.statusCode});  
        return;
       }
      }
  }catch(e){
    console.error(e)
  }
}

useEffect(() =>{

  generateFourDigit();

return () =>{
  //exit in memory
}

},[formOpenType])

useEffect(() =>{
let isCancelled = false;

return () =>{
  isCancelled = true;
  //exit in memory
}
},[fourDigits]);


 useEffect(() => {
  if(faculty.data.length > 0){
    setUpdatedFaculty((faculty) => faculty = true)
  }

  return () =>{
    //exit memory
  }
 }, [formOpenType, faculty]);


 const [academicyear, setAcademicYear] = useState({data:[]});

 useEffect(() =>{

  return () =>{
    //exit in memory
  }
 },[updatedFaculty])

 const getAllActiveCourse = async () =>{
  try{ 
    //online api
      const sendRequest = await fetch(basedUrl+"/course-active.php");
      const getResponse = await sendRequest.json();
 
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data'
       //  console.log(getResponse)
        setCourse((course) => course = {...course, data: getResponse});
      }
  }catch(e){
    console.error(e)
  }
}

useEffect(() =>{
let isCancelled = false;
getAllActiveCourse();
return () => {isCancelled = true}
},[formOpenType])

const getAllActiveSection = async () =>{
  try{ 
    //online api
      const sendRequest = await fetch(basedUrl+"/section-active.php");
      const getResponse = await sendRequest.json();
 
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data'
       //  console.log(getResponse)
        setSection((section) => section = {...section, data: getResponse});
      }
  }catch(e){
    console.error(e)
  }
}

useEffect(() =>{
  let isCancelled = false;
  getAllActiveSection();
  return () => {isCancelled = true}
  },[formOpenType])


  const getAllAcadYear = async () =>{
    try{ 
      //online api
        const sendRequest = await fetch(basedUrl+"/all-academic-year-active.php");
        const getResponse = await sendRequest.json();
   
        if(getResponse.statusCode === 201){
        
        }else{
          //if succesfully retrieve data'
         //  console.log(getResponse)
         setAcademicYear({data: getResponse});
           
        }
    }catch(e){
      console.error(e)
    }
  }
  
  useEffect(() =>{
    getAllAcadYear();
  return () =>{
  
  }
  },[formOpenType])

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
