
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, Snackbar, Stack, FormControl } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from 'react-redux';
import { basedUrl } from '../base-url/based-url'

import { useTheme } from '@mui/material/styles';

import { NoRowBackground } from '../component/NoRowBackground';
import { imageBaseUrl } from '../base-url/based-url';
import { useNavigate} from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { PUT_STUDENT } from '../slice/FormSelectedRow/StudentSelected';

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


function LongMenu() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("student/"+123);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <VisibilityIcon />
         
      </IconButton>
    
         
       
    </div>
  );
}

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

export function StudentPerSectionView() {  
    //dispatch from redux
    const dispatch = useDispatch();
        //Selected Section
    const section = useSelector(state => state.sectionSelected.value);
    const [rows, setRows] = useState([]);
    const [professors, setProfessors] = useState([]);
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



const getAllData = async () =>{
  isLoading(true)
  try{ 
    const data = new FormData();
    data.append('SectionName', section.sectionandacademicyear);
    console.log(section.sectionandacademicyear)
    //online api
       const sendRequest = await fetch(basedUrl+"/section-student-table.php",{
          method: "POST",
          body: data,
      });
      const getResponse = await sendRequest.json();
      console.log("Student per section "+JSON.stringify(getResponse))
      isLoading(false)
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
        isLoading(false)
        console.log(getResponse)
        setRows(getResponse);
      }
  }catch(e){
    console.error(e)
  }
}


const getAllProfessors = async () =>{
  isLoading(true)
  try{ 
  
    //online api
       const sendRequest = await fetch(basedUrl+"/professor-active.php");
      const getResponse = await sendRequest.json();
      isLoading(false)
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
        isLoading(false)
        setProfessors(getResponse);
      }
  }catch(e){
    console.error(e)
  }
}

  // Get all users api
  useEffect( () => {
    getAllData();
    return () =>{
      //exit in memory;
    }
  }, [formOpenType]);
 
  //Get all professors api

  useEffect(() => {
    getAllProfessors();

    return () =>{
      //exit in memory
    }
  },[formOpenType]);


  //Edit day via cell
function EditDay(props) {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const { id, value, field } = props;
  const apiRef = useGridApiContext();
  
  const updateCellDay = async() =>{
    await apiRef.current.setEditCellValue({ id, field, value: personName });
      apiRef.current.stopCellEditMode({ id, field });
}
const handleChangeDay = (event) => {
  const {
    target: { value },
  } = event;
  setPersonName(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split('/'): value,
  );
  
};



  return (
    <>
        <Select
        fullWidth
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChangeDay}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          onBlur = {updateCellDay}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name.substring(0,3)}
              style={getStyles(name, personName, theme)}
            >
              {name.substring(0,3)}
            </MenuItem>
          ))}
        </Select>
    </>
  );
}

EditDay.propTypes = {
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

const renderEditDay = (params) => {
  return <EditDay {...params} />;
};
//End of edit day via cell 


 //Edit year via cell
function EditProfessor(props) {

  const { id, value, field } = props;
  const apiRef = useGridApiContext();
  
  const handleChangeProfessor = async(event) =>{
    
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      apiRef.current.stopCellEditMode({ id, field });
    console.log(value)
}

  return (
    <>
    <Select
     value={value}
      sx={{ height: 1 , width: 260}}
      autoFocus
      onChange={handleChangeProfessor}
    >
      {console.log(professors)}
      {professors.map((activeProfessors) => (<MenuItem value = {activeProfessors.professor_username} >{activeProfessors.firstname+" "+activeProfessors.middlename+" "+activeProfessors.lastname}</MenuItem>))}
    </Select>
    </>
  );
}

EditProfessor.propTypes = {
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

const renderEditProfessor = (params) => {
  return <EditProfessor {...params} />;
};
//End of edit professor via cell 



  
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
      field: 'profile_url',
      headerName: 'Avatar',
      width: 150,
     editable: false,
     renderCell: (params) => {
      return (
        <>
          <Avatar src={imageBaseUrl+params.value} />
        </>
      );
    },
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
      width: 259,
      editable: false,
      
   },
  {
          field: 'studentnumber',
          headerName: 'Student Id',
          width: 260,
          editable: false,
  },
  {
      field: 'contact',
      headerName: 'Contact',
      width: 200,
      editable: true,
},
      {
        field: 'id',
        headerName: 'Actions',
        width: 100,
        editable: false,
        renderCell: (cellValues) => {
          return(
          <>
        <LongMenu />
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
      dataUpdate.append('ProfessorUsername', newRow['professor_initial']);
      dataUpdate.append('Time', newRow['schedule_time']);
      dataUpdate.append('Day', newRow['schedule_day']);
      dataUpdate.append('Status', newRow['status']);
      dataUpdate.append('Action', 'Update');
      dataUpdate.append('EditorPosition', user.position);
      dataUpdate.append('EditorEmail', user.email);
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
     {renderConfirmDialog()}
    <DataGrid components={{ Toolbar: CustomToolbarSection, LoadingOverlay: LinearProgress,NoResultsOverlay: () => (
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
      dispatch(PUT_STUDENT(selectedRowData[0]))
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
