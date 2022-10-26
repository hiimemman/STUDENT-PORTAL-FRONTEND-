import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, OutlinedInput, Snackbar, Stack } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector, useDispatch } from 'react-redux';
import { basedUrl } from '../base-url/based-url'

import {ADDSECTION} from '../slice/AddFormSlice/AddSectionSlice/AddSectionSlice'
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Suspense } from 'react';
import { PUT_SECTION } from '../slice/FormSelectedRow/SectionSelected';
import { AddSection } from '../forms/AddSection';


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
  if (newRow.year_available !== oldRow.year_available) {
   
    return `Year from '${oldRow.year_available}' to '${newRow.year_available}'`;
  }
  if (newRow.semester_available !== oldRow.semester_available) {
   
    return `Semester from '${oldRow.semester_available}' to '${newRow.semester_available}'`;
  }
  return null;
}

export function SectionScheduleTable() {  
    //dispatch from redux
    const dispatch = useDispatch();
        //Selected Section
const section = useSelector(state => state.sectionSelected.value);
    const [rows, setRows] = useState([]);
    const [loading, isLoading] = useState(false);

    const mutateRow = useFakeMutation();

  const noButtonRef = useRef(null);

  const [promiseArguments, setPromiseArguments] = useState(null);

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

    //Open add form
const  formOpenType = useSelector(state => state.addFormSection.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));


  // Get all users api
  useEffect( () => {
   const getAllData = async () =>{
      isLoading(true)
      try{ 
        const data = new FormData();
        data.append('SectionName', section.section_name);
        data.append('AcademicYear', section.academic_year);

        //online api
           const sendRequest = await fetch(basedUrl+"/section-schedule-table.php",{
              method: "POST",
              body: data,
          });
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
      field: 'subject_name',
      headerName: 'Subject',
      width: 150,
     editable: false,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 200,
       editable: false,
    },
    {
        field: 'units',
        headerName: 'Units',
        width: 50,
        editable: false,
      },
      {
        field: 'semester',
        headerName: 'Semester',
        width: 150,
        editable: false,
      },
      {
        field: 'academic_year',
        headerName: 'Academic Year',
        width: 150,
        editable: false,
      },
      {
        field: 'schedule_day',
        headerName: 'Schedule Day',
        width: 150,
        editable: true,
      },
      {
        field: 'schedule_time',
        headerName: 'Time',
        width: 100,
        editable: true,
      },
      {
        field: 'professional_initial',
        headerName: 'Professor',
        width: 190,
        editable: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        renderEditCell: renderEditStatus,
        width: 100,
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
      dataUpdate.append('Course', newRow['course_available']);
      dataUpdate.append('Year', newRow['year_available']);
      dataUpdate.append('Semester', newRow['semester_available']);
      dataUpdate.append('Type', newRow['type']);
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
    <DataGrid components={{ Toolbar: CustomToolbarSection, LoadingOverlay: LinearProgress,NoRowsOverlay: () => (
      <Stack height="100%" alignItems="center" justifyContent="center">
        No rows in DataGrid
      </Stack>
    ), }} loading = {loading} rows = {rows} columns={columns}  experimentalFeatures={{ newEditingApi: true }} style ={{height:'500px'}}
     processRowUpdate={processRowUpdate}
    //  onSelectionModelChange={(ids) => {
    //   const selectedIDs = new Set(ids);
    //   const selectedRowData = rows.filter((row) =>
    //     selectedIDs.has(row.id.toString())
    //   );
    //   dispatch(PUT_SECTION(selectedRowData[0]))
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
 function CustomToolbarSection() {
  //Open add form
  const  formOpenType = useSelector(state => state.addFormSection.value);
  //dispatch from redux
const dispatch = useDispatch();
const [courses, setCourses] = useState({data: []});
const [updatedCourse, setUpdatedCourse] = useState(false);
//  Get all users api
 useEffect( () => {
  console.log('UseEffect called')
  const getAllData = async () =>{
     try{ 
       //online api
         const sendRequest = await fetch(basedUrl+"/course-active.php");
         const getResponse = await sendRequest.json();
    
         if(getResponse.statusCode === 201){
         
         }else{
           //if succesfully retrieve data'
          //  console.log(getResponse)
           setCourses({data: getResponse});
            
         }
     }catch(e){
       console.error(e)
     }
   }
   getAllData();
 }, [formOpenType]);

 useEffect(() => {
  if(courses.data.length > 0){
    console.log("Courses data = "+JSON.stringify(courses));
    setUpdatedCourse(true)
  }
 }, [formOpenType, courses]);


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