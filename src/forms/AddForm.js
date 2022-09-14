import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import {OPEN, CLOSE} from '../slice/FormSlice/FormSlice'
import {DEFAULT} from '../slice/FormType/FormType'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

 




export function AddForm(props){
  //Current email inform
  const [Email, setEmail] = useState("Controlled"); 
 
//dispatch from redux
const dispatch = useDispatch();

const theme = useTheme();

  //Current form state
  const formState = useSelector(state => (state.isOpenForm.value));
  
  //Current form type
  const formType = useSelector(state => (state.formType.value));

  //Responsiveness
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
     dispatch(OPEN());
    };
  
    const handleClose = () => {
     dispatch(CLOSE());
     dispatch(DEFAULT());
    };


    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
 
    
    const checkEmployeeEmail = async (event) => {

      setEmail(event.target.value)
      console.log(event.target.value)
      // console.log(Email)
        const data = new FormData();
        data.append('Email', Email)
        try{
          //online api
            const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/employee-add.php",{
                method: "POST",
                body: data,
            });
      
          //offline api
        //   const sendRequest = await fetch("http://localhost/student_portal/employee/backend/login.php",{
        //     method: "POST",
        //     body: data,
        // });
            
            const getResponse = await sendRequest.json();
            if(getResponse.statusCode === 201){
            console.log("error")
            }else{
            
            }
        }catch(e){
         console.log(e)
        }
      }   

   
 const AddEmployee = () =>{

  return(
    <>
      <Dialog
        fullScreen
        open={formState}
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Employee Form
            </Typography>
            <Button autoFocus variant="outlined"  color= "inherit" onClick={handleClose}>
              Submit
            </Button>
          </Toolbar>
        </AppBar>
        <div className ="h-56 grid grid-cols-3 gap-4 content-between ...">
        <TextField
          required
          autoFocus
          margin="dense"
          id="firstname"
          label="First Name"
          width ="100"
          variant="outlined"
          fullWidth
        />
        
        <TextField
          autoFocus
          margin="dense"
          id="middlename"
          label="Middle Name"
          type="text"
          variant="outlined"
          fullWidth
        />
         <TextField
          required
          autoFocus
          margin="dense"
          id="lastname"
          label="Last Name"
          type="text"
          variant="outlined"
          fullWidth
        />
         <TextField
         label = "Email Address"
         value = {Email}
         required
          autoFocus
          margin="dense"
          id="email"
          type= "email"
          variant="outlined"
          fullWidth
          onKeyUp={checkEmployeeEmail}
         />
       </div>
      </Dialog>
    </>
  );
}

    return(
     <>
     {formType =='employee' ? AddEmployee() : (<div></div>)
    }
     </>
    );
}