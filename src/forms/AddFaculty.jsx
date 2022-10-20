import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid2 version 2
import { Alert, Container, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CLOSEFORM } from '../slice/AddFormSlice/AddFacultySlice/AddFacultySlice';
import { basedUrl } from '../base-url/based-url';

export function AddFaculty(){
  const [scroll, setScroll] = useState('paper');
 //dispatch from redux
 const dispatch = useDispatch();

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));


  const [errorFaculty, setErrorFaculty] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

 //Open add form
const  formOpenType = useSelector(state => state.addFormFaculty.value);

//Snackbar
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);
  
  const handleChangeFaculty = async (event) =>{

    try{
      const data = new FormData();
      data.append('Faculty', event.target.value);
      const sendRequest = await fetch(basedUrl+"/exist-faculty-name.php",{
        method: "POST",
        body: data,
    });

    const getResponse = await sendRequest.json();
    console.log(getResponse.statusCode)
    if(getResponse.statusCode === 200){
      setErrorFaculty(false);
     
    }else{
      setErrorFaculty(true);
     
    }
    }catch(e){
      setErrorFaculty(true);
     
  }
  
   
  }

  const handleChangeDescription = (event) =>{
    if((event.target.value).toString().length >0){
      setErrorDescription(false)
    }else{
      setErrorDescription(true)
    }
  }

 
  const handleClose = () => {
   dispatch(CLOSEFORM());
   };
 
   const descriptionElementRef = useRef(null);
   useEffect(() => {
    if (formOpenType === 'subject') {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [formOpenType]);
 
const handleSubmitForm = async (event) =>{
 
//`action`,`category`,`editor_position`,`editor_email`,`edited_email`
  event.preventDefault();
  if(!errorFaculty && !errorDescription){
  const data = new FormData(event.currentTarget);
  data.append('Action', 'Create');
  data.append('EditorPosition', user.position);
  data.append('EditorEmail', user.email);
  data.append('Category', 'Faculty');

  try{
    const sendRequest = await fetch(basedUrl+"/faculty-add.php",{
              method: "POST",
              body: data,
          });

          const getResponse = await sendRequest.json();
         console.log(getResponse.statusCode)
          if(getResponse.statusCode === 200){
            setSnackbar({ children: 'Update successfully', severity: 'success' });
            dispatch(CLOSEFORM())
          }else{
            setSnackbar({ children: "Field can't be empty", severity: 'error' });
          }
  }catch(e){
    
    setSnackbar({ children: "Field can't be empty", severity: 'error' });
  }
  }else{
    setSnackbar({ children: "Field can't be empty", severity: 'error' });
  }
}
 
  return(
    <>
      <Dialog
        open={formOpenType === 'faculty'}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >

        <DialogTitle id="scroll-dialog-title">Add Faculty</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddFaculty"  onSubmit={handleSubmitForm} nowrap>
    
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorFaculty} name ="Faculty"  required label="Faculty" variant="outlined" onKeyUp =  {handleChangeFaculty} />
        {errorFaculty === true ? (<FormHelperText id="component-helper-text">Faculty already exist
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorDescription} name ="Description" fullWidth required label="Description" variant="outlined" onKeyUp =  {handleChangeDescription} />
        {errorDescription === true ? (<FormHelperText id="component-helper-text">Description must not be empty (It can be anything that describe the faculty)
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2>
        </Grid2>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form ="frmAddFaculty">SUBMIT</Button>
        </DialogActions>
      </Dialog>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  )
}