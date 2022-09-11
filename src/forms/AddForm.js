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

export function AddForm(props){
//dispatch from redux
const dispatch = useDispatch();

  //Current form state
  const formState = useSelector(state => (state.isOpenForm.value));
  
  //Current form type
  const formType = useSelector(state => (state.formType.value));

    const handleClickOpen = () => {
     dispatch(OPEN());
    };
  
    const handleClose = () => {
     dispatch(CLOSE());
     dispatch(DEFAULT());
    };


 const AddEmployee = () =>{

  return(
    <>
    <Dialog open={formState} onClose={handleClose}>
      <DialogTitle>New Employe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          First Name
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
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