import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, OutlinedInput, Snackbar } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector, useDispatch } from 'react-redux';
import { basedUrl } from '../base-url/based-url'
import { PUT_STUDENT } from '../slice/FormSelectedRow/StudentSelected';
import { imageBaseUrl } from '../base-url/based-url';
import { ADDANNOUNCEMENT } from '../slice/AddFormSlice/AddAnnouncementSlice/AddAnnouncementSlice';
import { AddStudent } from '../forms/AddStudent';
import { AddAnnouncement } from '../forms/AddAnnouncement';

 
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
  if (newRow.image_url !== oldRow.image_url) {
   
    return `Image url from '${oldRow.image_url}' to '${newRow.image_url}'`;
  }
  if (newRow.title !== oldRow.title) {
   
    return `Title from '${oldRow.title}' to '${newRow.title}'`;
  }
  if (newRow.category !== oldRow.category) {
   
    return `Category from '${oldRow.category}' to '${newRow.category}'`;
  }
  if (newRow.message !== oldRow.message) {
   
    return `Message from '${oldRow.message}' to '${newRow.message}'`;
  }
  if (newRow.status !== oldRow.status) {
   
    return `Status from '${oldRow.status}' to '${newRow.status}'`;
  }
  return null;
}

export function ActivityTable() {  
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
const  formOpenType = useSelector(state => state.addFormAnnouncement.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

const [faculty, setCourses] = useState(null);

const [updatedCourse, setUpdateCourse] = useState('');

  // Get all student api
  const getAllData = async () =>{
    isLoading(true)
    try{ 
    
      //online api
        const sendRequest = await fetch(basedUrl+"/get-all-history.php");
        const getResponse = await sendRequest.json();
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


//Edit status via cell
function EditCategory(props) {
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
        
        <MenuItem value ={'Announcement'}>Announcement</MenuItem>
        <MenuItem value = {'News and Updates'}>News and Updates</MenuItem>
      </Select>
      </>
    
    );
  }
  
  EditCategory.propTypes = {
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
  
  const renderEditCategory = (params) => {
    return <EditCategory {...params} />;
  };
  //End of edit category via cell
 
const columns = [
  
    {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        minWidth: 0,
        editable: false,
    },
    {
        field: 'category',
        headerName: 'Category',
        flex: 1,
        minWidth: 0,
        editable: false,
    },
    {
        field: 'editor_position',
        headerName: 'Position',
        flex: 1,
        minWidth: 0,
        editable: false,
    },
    {
        field: 'editor_email',
        headerName: 'Editor',
           flex: 1,
        minWidth: 0,
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
      dataUpdate.append('ID', newRow['id']);
      dataUpdate.append('ImageUrl', newRow['image_url']);
      dataUpdate.append('Title', newRow['title']);
      dataUpdate.append('Category', newRow['category']);
      dataUpdate.append('Message', newRow['message']);
      dataUpdate.append('Status', newRow['status']);
      dataUpdate.append('Action', 'Update');
      dataUpdate.append('EditorPosition', user.position);
      dataUpdate.append('EditorEmail', user.email);
      dataUpdate.append('Category', 'Announcement');
      const response = await mutateRow(newRow);
      const sendRequest = await fetch(basedUrl+"/announcement-update.php",{
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
    <DataGrid components={{ Toolbar: CustomToolbarProfessor, LoadingOverlay: LinearProgress, }} loading = {loading} rows = {rows} columns={columns}  
    style ={{height:'500px'}}
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
  const  formOpenType = useSelector(state => state.addFormAnnouncement.value);
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
