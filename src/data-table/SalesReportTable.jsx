import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport,GridFooterContainer, GridFooter  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, OutlinedInput, Snackbar,  Typography } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector, useDispatch } from 'react-redux';
import { basedUrl } from '../base-url/based-url'
import { AddSubject } from '../forms/AddSubject';
import { ADDFEE } from '../slice/AddFormSlice/AddFeeSlice/AddFeeSlice';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { Suspense } from 'react';
import { PUT_SUBJECT } from '../slice/FormSelectedRow/SubjectSelected';
import { NoRowBackground } from '../component/NoRowBackground';
import { AddFee } from '../forms/AddFee';
import moment from 'moment';

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


const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP',
});

const usdPrice = {
  type: 'number',
  width: 130,
  valueFormatter: ({ value }) => currencyFormatter.format(value),
  cellClassName: 'font-tabular-nums',
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
  if (newRow.name !== oldRow.name) {
   
    return `Fee name name from '${oldRow.name}' to '${newRow.name}'`;
  }
  if (newRow.amount !== oldRow.amount) {
   
    return `Amount name from '${oldRow.amount}' to '${newRow.amount}'`;
  }
  if (newRow.status !== oldRow.status) {
   
    return `Status from '${oldRow.status}' to '${newRow.status}'`;
  }
  return null;
}

export function SalesReportTable() {  
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
const  formOpenType = useSelector(state => state.addFormFee.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

const [courses, setCourses] = useState(null);

const [updatedCourse, setUpdateCourse] = useState('');

const [totalPayment, setTotalPayment] = useState(0);

  // Get all users api
  useEffect( () => {
   const getAllData = async () =>{
      isLoading(true)
      try{ 
      
        //online api
          const sendRequest = await fetch(basedUrl+"/get-all-payment-history.php");
          const getResponse = await sendRequest.json();
          isLoading(false)
          if(getResponse.statusCode === 201){
          
          }else{
            //if succesfully retrieve data
            isLoading(false)
      
        
           let content = getResponse.map((res) => {
            console.log(res.after_edit)
            let con = JSON.parse(res.after_edit);
            
            console.log(res.after_edit)
            con['added_at'] = moment(con['added_at']).format("MMMM D, YYYY hh:mm A");
            return con;
           })
           setRows(rows => rows = content)

        //    console.log(content)
        //    setRows(rows => rows = [...rows , res.after_edit] })
            
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
    getAllData();
  }, [formOpenType]);
 
useEffect(() =>{

  let totalpaymenttable = 0;

  rows.map((row) => {totalpaymenttable = parseFloat(totalpaymenttable) + parseFloat(row.payment);
  })

  setTotalPayment(totalPayment => totalPayment = totalpaymenttable);

return () =>{
  
}
},[rows])

useEffect(() =>{
  console.log(rows)
return () => {}
},[totalPayment])

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
        headerName: 'Student Number',
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
        field: 'academicyear',
        headerName: 'AcademicYear',
        flex: 1,
        minWidth: 0,
        editable: false,
      },
      {
        field: 'sectionandsemester',
        headerName: 'Section',
        flex: 1,
        minWidth: 0,
        editable: false,
      },
      {
        field: 'payment',
        headerName: 'Payment',
        flex: 1,
        minWidth: 0,
        ...usdPrice,
        editable: false,
      },
      {
        field: 'added_at',
        headerName: 'Date paid',
        flex: 1,
        minWidth: 300,
        type: 'date',
        editable: false,
      },
      // {
      //   field: 'status',
      //   headerName: 'Status',
      //   renderEditCell: renderEditStatus,
      //   flex: 1,
      //   minWidth: 0,
      //   editable: true,
      //   renderCell: (cellValues) => {
      //     return(
      //     <>
      //   {cellValues.value == "active" ? (<Chip icon={<CheckIcon/>} label="active  " color ="success" size = "small" variant = "outlined"/>) : (<Chip icon={<CloseIcon/>} label="inactive" color ="error" size = "small" variant = "outlined"/>)}

      //     </>
      //     );//end of return
      //   }
      // },
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
      dataUpdate.append('Name', newRow['name']);
      dataUpdate.append('Amount', newRow['amount']);
      dataUpdate.append('Status', newRow['status']);
      dataUpdate.append('Action', 'Update');
      dataUpdate.append('EditorPosition', user.position);
      dataUpdate.append('EditorEmail', user.email);
      dataUpdate.append('Category', 'Fee');
      const response = await mutateRow(newRow);
      const sendRequest = await fetch(basedUrl+"/fee-update.php",{
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
     
    <DataGrid  components={{ Toolbar: CustomToolbarSubject, Footer: CustomFooter, LoadingOverlay: LinearProgress,NoResultsOverlay: () => (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <NoRowBackground  />
      </Stack>
    ), }} loading = {loading} rows = {rows} columns={columns}  style ={{height:'500px'}}
    componentsProps = {{footer : {CustomFooter : '1231'}}}
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
 useEffect( () => {

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