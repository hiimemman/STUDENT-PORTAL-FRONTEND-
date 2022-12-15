import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StudentDrawerAppBar } from '../component/StudentDrawerAppBar';
import { CssBaseline, Paper, Stack, Chip, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert, TextField } from '@mui/material';
// import { DashboardCard } from '../component/DashboardCard/DashboardCard';
import { Suspense } from 'react';;
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { basedUrl } from '../../base-url/based-url';
import { DashboardCard } from '../../component/DashboardCard/DashboardCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { GRADING } from '../../slice/ProfessorPageSlice/ProfessorPageSlice';
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
import { Input } from 'postcss';

import DialogContentText from '@mui/material/DialogContentText';



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
  if (newRow.grade !== oldRow.grade) {
    return `Grade from '${oldRow.grade}' to '${newRow.grade}'`;
  }
  return null;
}


function LongMenu(props) {
  const [open, setOpen] = useState(false);

  //Snackbar
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const professorSession = useSelector(state => JSON.parse(state.professor.session));

  const handleSubmit = async (event) =>{ 
    event.preventDefault();
    if(!errorPayment){
      const data = new FormData(event.currentTarget);
      data.append('ID', props.id.id)
      data.append('Action', 'Update');
      data.append('EditorPosition', 'Professor');
      data.append('EditorEmail', professorSessionSession.email);
      data.append('Category', 'Grade');
      for (var pair of data.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
  try{
    const sendRequest = await fetch(basedUrl+"/update-grade-per-student.php",{
      method: "POST",
      body: data,
  });
  
  const getResponse = await sendRequest.json();
  if(getResponse.statusCode !== 201){
    setSnackbar({ children: 'Grade updated successfully', severity: 'success' });
  }else{
    setSnackbar({ children: 'Grades must be between 1.00 ~ 5.00', severity: 'error' });
  }
  } catch (error) {
    setSnackbar({ children: "Can't access the server", severity: 'error' });
  }
    
  }else{
    setSnackbar({ children: 'Grades must be between 1.00 ~ 5.00', severity: 'error' });
  }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [errorGrade, setErrorGrade] = useState(false);
  const [gradeText, setGradeText] = useState('');
  const [value, setValue] = useState("0.0");

  const handleChangeGrade = (event) =>{
    setValue(parseFloat(e.target.value).toFixed(1))
    if(parseFloat(event.target.value) <= 0 || parseFloat(event.target.value) > 5){
      setErrorGrade(errorGrade => errorGrade = true);
      setGradeText((gradeText) => gradeText = 'grades must be between 1.00 ~ 5.00');
    }else{
      setErrorGrade(errorGrade => errorGrade = false);
      setGradeText((gradeText) => gradeText = '');
    }
  }

  useEffect(() =>{
    return () =>{}
  },[errorGrade])

  useEffect(() =>{
    return () =>{}
  },[gradeText])

  

  
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
        <EditIcon />
         
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Update {props.id.student_id} final grade in {props.id.subject_name}
        </DialogTitle>
        <Box component ="form" onSubmit = {handleSubmit}>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
           <TextField
      
         fullWidth
         required
         error = {errorGrade}
         value={value}
          type ="number"
          id="Grade"
          label="Update Grade"
          name ="Grade"
          inputProps={{
            maxLength: 3,
            step: "1"
          }}
          onChange = {handleChangeGrade}
          helperText = {gradeText}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button type ="submit" autoFocus>
            Agree
          </Button>
        </DialogActions>
        </Box>
      </Dialog>
      {!!snackbar && (
        <Snackbar anchorOrigin={{ vertical:"top", horizontal: "center" }} open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

export function UpdateGradesPerSection(){
  const {email, sectionandacademicyear} = useParams();
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
          formData.append('Section', sectionandacademicyear)
     
          //online api
            const sendRequest = await fetch(basedUrl+"/get-student-grade-per-section.php",{
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
      dispatch(GRADING());
      return() => {isCancelled = true}
     },[currentPage])

    useEffect(() =>{
        if(studentSession === null){
         navigate('/professor-portal')
        } 
       },[navigate, studentSession]);


       

  
//Edit status via cell
function EditGrades(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async(event) =>{
    
    // let conversion = 0.00;
    // if(parseFloat(event.target.value) < 66.67){
    //   conversion = 5.00;
    // }
    // if(parseFloat(event.target.value) >= 66.67 && parseFloat(event.target.value) >= 69.69 ){
    //   conversion = 4.00;
    // }
    // if(parseFloat(event.target.value) >= 70.00 && parseFloat(event.target.value) >= 73.33 ){
    //   conversion = 3.00;
    // }
    // if(parseFloat(event.target.value) >= 73.34 && parseFloat(event.target.value) >= 76.67 ){
    //   conversion = 2.75;
    // }
    // if(parseFloat(event.target.value) >= 76.68 && parseFloat(event.target.value) >= 80.01 ){
    //   conversion = 2.50;
    // }
    // if(parseFloat(event.target.value) >= 80.02 && parseFloat(event.target.value) >= 83.35 ){
    //   conversion = 2.25;
    // }
    // if(parseFloat(event.target.value) >= 83.36 && parseFloat(event.target.value) >= 86.69 ){
    //   conversion = 2.00;
    // }
    // if(parseFloat(event.target.value) >= 86.70 && parseFloat(event.target.value) >= 90.03 ){
    //   conversion = 1.75;
    // }
    // if(parseFloat(event.target.value) >= 90.04 && parseFloat(event.target.value) >= 93.37 ){
    //   conversion = 1.50;
    // }
    // if(parseFloat(event.target.value) >= 93.38 && parseFloat(event.target.value) >= 96.71){
    //   conversion = 1.25;
    // }
    // if(parseFloat(event.target.value) >= 96.72 && parseFloat(event.target.value) >= 100 ){
    //   conversion = 1.00;
    // }
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      apiRef.current.stopCellEditMode({ id, field });
  
}

  return (
    <>
    <TextField  type ="number" variant="outlined" onChange =  {handleChange} />
    </>
  
  );
}

EditGrades.propTypes = {
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

const renderEditGrades = (params) => {
  return <EditGrades {...params} />;
};
//End of edit status via cell



  
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
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    flex: 1,
    minWidth: 90,
    valueGetter: (params) =>
      `${params.row.firstname || ''} ${params.row.middlename || ''} ${params.row.lastname || ''}`,
  },
  {
    field: 'subject_name',
    headerName: 'Subject code',
    flex: 1,
    minWidth: 50,
   editable: false,
  },
  {
    field: 'student_id',
    headerName: 'Student number',
    flex: 1,
    minWidth: 200,
   editable: false,
  },
  {
    field: 'description',
    headerName: 'Subject',
    flex: 1,
    minWidth: 300,
   editable: false,
  },
  {
    field: 'semester',
    headerName: 'Semester',
    flex: 1,
    minWidth: 100,
   editable: false,
  },
    {
        field: 'grade',
        headerName: 'Final grade',
        flex: 1,
        minWidth: 100,
        type: 'number',
        editable: true,
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

console.log("Pumasok dito")

    try {
      // Make the HTTP request to save in the backend
      const dataUpdate = new FormData();
      dataUpdate.append('ID', newRow['id']);
      dataUpdate.append('Grade', newRow['grade']);
      dataUpdate.append('StudentNumber', newRow['student_id']);
      dataUpdate.append('Action', 'Update');
      dataUpdate.append('EditorPosition', 'professor');
      dataUpdate.append('EditorEmail', studentSession.email);
      dataUpdate.append('Category', 'Grades');
      const response = await mutateRow(newRow);
      for (var pair of dataUpdate.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    
      const sendRequest = await fetch(basedUrl+"/update-grade-per-student.php",{
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
    <Typography variant ="h3" style ={{m:'1.5rem'}}>SECTION: {sectionandacademicyear}</Typography>
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