import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StudentDrawerAppBar } from '../component/StudentDrawerAppBar';
import { CssBaseline, Paper, Stack, Chip, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';
// import { DashboardCard } from '../component/DashboardCard/DashboardCard';
import { Suspense } from 'react';;
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import Avatar from '@mui/material/Avatar';
import { basedUrl } from '../../base-url/based-url';
import { DashboardCard } from '../../component/DashboardCard/DashboardCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {SCHEDULE} from '../../slice/ProfessorPageSlice/ProfessorPageSlice';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { StudentDashboardCard } from '../component/StudentDashboardCard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import SchoolIcon from '@mui/icons-material/School';
import { update } from 'react-spring';
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

import LinearProgress from '@mui/material/LinearProgress';




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

const names = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
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
  if (newRow.professor_initial !== oldRow.professor_initial) {
    console.log("Pumasok dto")
    return `Professor from '${oldRow.professor_initial}' to '${newRow.professor_initial}'`;
  }
  if (newRow.status !== oldRow.status) {
    return `Status from '${oldRow.status}' to '${newRow.status}'`;
  }
  if (newRow.schedule_day !== oldRow.schedule_day) {
    return `Schedule in day(s) from '${oldRow.schedule_day}' to '${newRow.schedule_day}'`;
  }
  if (newRow.schedule_time !== oldRow.schedule_time) {
    return `Schedule in day(s) from '${oldRow.schedule_time}' to '${newRow.schedule_time}'`;
  }
  return null;
}
export function ProfessorSchedule(){

     //UseNavigate
     const navigate = useNavigate();

     const dispatch = useDispatch();
     //get student
     const studentSession = useSelector(state => JSON.parse(state.professor.session))

     const currentPage = useSelector(state =>  (state.studentSelectedPage.value));

     const [studentSection , setStudentSection] = useState({data:{}});
     const [updatedSection, setUpdatedSection] = useState(false);
     const [loading, isLoading] = useState(false);
      const [status, setStatus ] = useState('Unenrolled');
      const [promiseArguments, setPromiseArguments] = useState(null);
      const [rows, setRows] = useState([]);
      const [snackbar, setSnackbar] = useState(null);

      const mutateRow = useFakeMutation();

      const noButtonRef = useRef(null);


      const handleCloseSnackbar = () => setSnackbar(null);

      const getAllStudenSection = async () =>{
        try{ 
          const formData = new FormData();

          formData.append('Username', studentSession.professor_username);
     
          //online api
            const sendRequest = await fetch(basedUrl+"/get-schedule-per-professor.php",{
              method: "POST",
              body: formData,
          });
            const getResponse = await sendRequest.json();

            if(getResponse.statusCode === 201){
              console.log(getResponse.error)
            }else{
              //if succesfully retrieve data
           
              setRows((rows) => rows = getResponse.content);
            }
        }catch(e){
          console.error(e)
        }
       }

       
       useEffect(() =>{
        getAllStudenSection();
        return() =>{

        }
       },[currentPage])

       useEffect(() =>{
        return () =>{}
       },[rows])

      
       useEffect(() =>{
        console.log(studentSection.data)
        if(studentSection.data.length > 0){
          setUpdatedSection((updatedSection => updatedSection = true))
        }
        return () => {}
       },[studentSection.data])

   useEffect(() =>{

    return () =>{}
   },[updatedSection])

     useEffect(()=>{
      let isCancelled = false;
      dispatch(SCHEDULE());
      return() => {isCancelled = true}
     },[currentPage])

    useEffect(() =>{
        if(studentSession === null){
         navigate('/professor-portal')
        } 
       },[navigate, studentSession]);


       

  
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
    field: 'subject_name',
    headerName: 'Subject',
    flex: 1,
    minWidth: 0,
    maxWidth: 100,
   editable: false,
  },
  {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 0,
      minWidth: 290,
     editable: false,
  },
    {
      field: 'schedule_day',
      headerName: 'Schedule Day',
      flex: 1,
      minWidth: 200,
      editable: false,
    },
    {
      field: 'schedule_time',
      headerName: 'Time',
      flex: 1,
      minWidth: 270,
      editable: false,
    },
    {
      field: 'professor_initial',
      headerName: 'Professor',
      flex: 1,
      minWidth: 0,
      editable: false,
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
      {cellValues.value == "active" ? (<Chip icon={<CheckIcon/>} label=" active  " color ="success" size = "small" variant = "outlined"/>) : (<Chip icon={<CloseIcon/>} label=" inactive" color ="error" size = "small" variant = "outlined"/>)}
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
      dataUpdate.append('Email', studentSession.email);
      dataUpdate.append('ProfessorUsername', newRow['professor_initial']);
      dataUpdate.append('Time', newRow['schedule_time']);
      dataUpdate.append('Day', newRow['schedule_day']);
      dataUpdate.append('Status', newRow['status']);
      dataUpdate.append('Action', 'Update');
      dataUpdate.append('EditorPosition', 'professor');
      dataUpdate.append('EditorEmail', studentSession.email);
      dataUpdate.append('Category', 'SectionSchedule');
      const response = await mutateRow(newRow);
      const sendRequest = await fetch(basedUrl+"/section-schedule-update.php",{
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
      console.log(error)
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
             <h2 className ='font-nunito font-bold'>Dashboard</h2>
 
  <Paper elevation={1} sx ={{width:'500 ', p: '1.5rem', m:'1rem'}} className ="rounded-xl">
  {renderConfirmDialog()}
  <DataGrid components={{ Toolbar: CustomToolbarSection, LoadingOverlay: LinearProgress,NoResultsOverlay: () => (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <NoRowBackground  />
      </Stack>
    ), }} loading = {loading} rows = {rows} columns={columns}  experimentalFeatures={{ newEditingApi: true }} style ={{height:'500px'}}
     processRowUpdate={processRowUpdate}
    /> 
    </Paper>

 {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    

 
        
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
 //Toolbar
 function CustomToolbarSection() {
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