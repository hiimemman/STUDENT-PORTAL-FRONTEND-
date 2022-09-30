import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Chip, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AddEmployee } from '../forms/AddEmployee';
import { useSelector, useDispatch } from 'react-redux';
import {OPEN, CLOSE} from '../slice/FormSlice/FormSlice'
import {EMPLOYEE, DEFAULT, formType} from '../slice/FormType/FormType'
import { ADDEMPLOYEE } from '../slice/AddFormSlice/AddEmployeeSlice/AddEmployeeSlice';
import {PUT_EMPLOYEE} from '../slice/FormSelectedRow/EmployeeSelected'
import {OPENSNACK, CLOSESNACK} from '../slice/Snackbars/EmployeeTableOpen/EmployeeTableOpen';
import {SUCCESSSNACK, FAILEDSNACK} from '../slice/Snackbars/EmployeeTableStatus/EmployeeTableStatus'
import {SUCCESSMESSAGESNACK, FAILEDMESSAGESNACK} from '../slice/Snackbars/EmployeeTableMessage/EmployeeTableMessage'

//Toolbar
function CustomToolbar() {

  //dispatch from redux
const dispatch = useDispatch();

 //Current session user
 const formState = useSelector(state => (state.isOpenForm.value));

 //Open snackbar
const open = useSelector(state => state.openSnackEmp.value);

//Open snackbar
const statusSnack = useSelector(state => state.snackStatusEmp.value);

//Snackbar Message
const messageSnack = useSelector(state => state.snackMessageEmp.value);

//Open add form
const  formOpenType = useSelector(state => state.addForm.value);

 //Open Add form
const openPopper = () =>{
  dispatch(ADDEMPLOYEE());
} 

useEffect(()=>{
console.log(formOpenType);
},[formOpenType]);

  return (<>
    <GridToolbarContainer>
      <Button variant="text" startIcon = {<PersonAddIcon />} onClick = {openPopper}> Add</Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
    <AddEmployee  open ={formOpenType === 'employee'}/> 
  </>
  );
}

//Edit Position
function EditPosition(props) {
  const dispatch = useDispatch();
  //Selected Employee
const employee = useSelector(state => state.employeeSelected.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));



    const { id, value, field } = props;
    const apiRef = useGridApiContext();
  
    const handleChange = async (event) => {

      
      await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      apiRef.current.stopCellEditMode({ id, field });
      try{
        const dataUpdate = new FormData();

        dataUpdate.append('About', employee.about);
        dataUpdate.append('Birthday', employee.birthday);
        dataUpdate.append('Contact', employee.contact);
        dataUpdate.append('Firstname', employee.firstname);
        dataUpdate.append('Lastname', employee.lastname);
        dataUpdate.append('Middlename', employee.middlename);
        dataUpdate.append('Position', event.target.value);
        dataUpdate.append('Sex', employee.sex);
        dataUpdate.append('Status', employee.status);
        dataUpdate.append('Twitter', employee.twitterprofile);
        dataUpdate.append('LinkedIn', employee.linkedinprofile);
        dataUpdate.append('Facebook', employee.facebookprofile);
        dataUpdate.append('Instagram', employee.instagramprofile);
        dataUpdate.append('Email', employee.email);
        dataUpdate.append('Action', 'Update');
        dataUpdate.append('EditorPosition', user.position);
        dataUpdate.append('EditorEmail', user.email);
        dataUpdate.append('Category', 'Employee');
        const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/employee-update.php",{
          method: "POST",
          body: dataUpdate,
      });
      
      const getResponse = await sendRequest.json();
      console.log(getResponse.statusCode);
      if(getResponse.statusCode !== 201){
        // dispatch(PUT_EMPLOYEE(getResponse.statusCode));
        // setOpen(true);
        // setStatus("success");
        // setMessage("Updated Successfully")
        // setisLoading(false);
       dispatch(PUT_EMPLOYEE(getResponse.statusCode))
       dispatch(OPENSNACK());
       dispatch(SUCCESSSNACK());
       dispatch(SUCCESSMESSAGESNACK('Updated Succesfully'));
      }else{
        dispatch(OPENSNACK());
        dispatch(FAILEDSNACK());
        dispatch(FAILEDMESSAGESNACK());
        // setisLoading(false);
        // setOpen(true);
        // setStatus("error");
        // console.log(getResponse.statusCode)
        // setMessage('Error see console log for error');
        // setisLoading(false);
      }
      }catch(e){

      }
     
    };
  
    return (
      <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ height: 1 , width: 170}}
        native
        autoFocus
      >
        <option>Admin</option>
        <option>Registrar</option>
      </Select>
    );
  }
  
  EditPosition.propTypes = {
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
  
  const renderEditPosition = (params) => {
    return <EditPosition {...params} />;
  };
  // End of edit position via cell
  
  //Edit status via cell
  function EditStatus(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
    const dispatch = useDispatch();
  //Selected Employee
const employee = useSelector(state => state.employeeSelected.value);

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));

    const handleChange = async (event) => {
      
      await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      apiRef.current.stopCellEditMode({ id, field });
      console.log(event.target.value)
      try{
        const dataUpdate = new FormData();

        dataUpdate.append('About', employee.about);
        dataUpdate.append('Birthday', employee.birthday);
        dataUpdate.append('Contact', employee.contact);
        dataUpdate.append('Firstname', employee.firstname);
        dataUpdate.append('Lastname', employee.lastname);
        dataUpdate.append('Middlename', employee.middlename);
        dataUpdate.append('Position', employee.position);
        dataUpdate.append('Sex', employee.sex);
        dataUpdate.append('Status', event.target.value);
        dataUpdate.append('Twitter', employee.twitterprofile);
        dataUpdate.append('LinkedIn', employee.linkedinprofile);
        dataUpdate.append('Facebook', employee.facebookprofile);
        dataUpdate.append('Instagram', employee.instagramprofile);
        dataUpdate.append('Email', employee.email);
        dataUpdate.append('Action', 'Update');
        dataUpdate.append('EditorPosition', user.position);
        dataUpdate.append('EditorEmail', user.email);
        dataUpdate.append('Category', 'Employee');
        const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/employee-update.php",{
          method: "POST",
          body: dataUpdate,
      });
      
      const getResponse = await sendRequest.json();
      console.log(getResponse.statusCode);
      if(getResponse.statusCode !== 201){
        // dispatch(PUT_EMPLOYEE(getResponse.statusCode));
        // setOpen(true);
        // setStatus("success");
        // setMessage("Updated Successfully")
        // setisLoading(false);
       dispatch(PUT_EMPLOYEE(getResponse.statusCode))
       dispatch(OPENSNACK());
       dispatch(SUCCESSSNACK());
       dispatch(SUCCESSMESSAGESNACK());
      }else{
        dispatch(OPENSNACK());
        dispatch(FAILEDSNACK());
        dispatch(FAILEDMESSAGESNACK());
        // setisLoading(false);
        // setOpen(true);
        // setStatus("error");
        // console.log(getResponse.statusCode)
        // setMessage('Error see console log for error');
        // setisLoading(false);
      }
      }catch(e){

      }
    };
  
    return (
      <>
        <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ height: 1 , width: 170}}
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
      field: 'profile_url',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => {
      
        return (
          <>
            <Avatar src={params.value} />
          </>
        );
      }
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
        field: 'position',
        headerName: 'Position',
        renderEditCell: renderEditPosition,
        width: 170,
        editable: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        renderEditCell: renderEditStatus,
        width: 160,
        editable: true,
        renderCell: (cellValues) => {
          
          return(
          <>
        {cellValues.value == "active" ? (<Chip icon={<CheckIcon/>} label="active  " color ="success" size = "small" variant = "outlined"/>) : (<Chip icon={<CloseIcon/>} label="inactive" color ="error" size = "small" variant = "outlined"/>)}
              
        
          </>
          );//end of return
        }
      },

      {
        field: 'added_at',
        headerName: 'Date Created',
        width: 190,
        type: 'date',
        editable: false,
      },
  ];

export function EmployeeTable() {
    //dispatch from redux
const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [loading, isLoading] = useState(false);
  
    //Open snackbar
    const open = useSelector(state => state.openSnackEmp.value);

    //Open snackbar
    const statusSnack = useSelector(state => state.snackStatusEmp.value);

    //Snackbar Message
    const messageSnack = useSelector(state => state.snackMessageEmp.value);
    //Open add form
const  formOpenType = useSelector(state => state.addForm.value);

    //Handeclose snackbar
  const handleClose = () =>{
    dispatch(CLOSESNACK());
  }
  // Get all users api
  useEffect( () => {
    
    const getAllEmployee = async () =>{
      try{ 
        isLoading(true)
        //online api
          const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/employee-table.php");
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
 
  return(
    <>
    <DataGrid components={{ Toolbar: CustomToolbar, LoadingOverlay: LinearProgress, }} loading = {loading} rows = {rows} columns={columns}  experimentalFeatures={{ newEditingApi: true }} style ={{height:'500px'}}
      onSelectionModelChange={(ids) => {
      const selectedIDs = new Set(ids);
      const selectedRowData = rows.filter((row) =>
        selectedIDs.has(row.id.toString())
      );
      dispatch(PUT_EMPLOYEE(selectedRowData[0]))
    }}
    /> 

    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity= {statusSnack} sx={{ width: '100%' }}>
                {messageSnack}
             </Alert>
       </Snackbar>
    </>
  );
}