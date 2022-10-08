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
import { CLOSESUBFORM } from '../slice/AddFormSlice/AddSubjectSlice/AddSubjectSlice';
import { basedUrl } from '../base-url/based-url';

export function AddSubject(){
  const [scroll, setScroll] = useState('paper');
 //dispatch from redux
 const dispatch = useDispatch();

//Current User Session
const user = useSelector(state => JSON.parse(state.user.session));


  const [errorSubjectCode, setErrorSubjectCode] = useState('');
  const [errorSubName, setErrorSubName] = useState('');
  const [errorUnits, setErrorUnits] = useState('');
  const [errorAmount, setErrorAmount] = useState('');

  //Open add form
const  formOpenType = useSelector(state => state.addFormSub.value);

//Snackbar
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);
  
  const handleChangeSubCode = async (event) =>{

    try{
      const data = new FormData();
      data.append('Subject_Code', event.target.value);
      const sendRequest = await fetch(basedUrl+"/exist-subject-code.php",{
        method: "POST",
        body: data,
    });

    const getResponse = await sendRequest.json();
    console.log(getResponse.statusCode)
    if(getResponse.statusCode === 200){
      setErrorSubjectCode(false);
     
    }else{
      setErrorSubjectCode(true);
     
    }
    }catch(e){
      setErrorSubjectCode(true);
     
  }
  
   
  }

  const handleChangeSubName = (event) =>{
    if((event.target.value).toString().length >0){
      setErrorSubName(false)
    }else{
      setErrorSubName(true)
    }
  }

  const handleChangeUnits = (event) =>{
    if(parseFloat(event.target.value)  > 0){
      setErrorUnits(false)
    }else{
      setErrorUnits(true)
    }
  }

  const handleChangeAmount = (event) =>{
    if(parseFloat(event.target.value) > 0){
      setErrorAmount(false)
    }else{
      setErrorAmount(true)
    }
  }
  const handleClose = () => {
   dispatch(CLOSESUBFORM());
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
  if(!errorSubjectCode && !errorSubName && !errorUnits && !errorAmount){
  const data = new FormData(event.currentTarget);
  data.append('Action', 'Create');
  data.append('EditorPosition', user.position);
  data.append('EditorEmail', user.email);
  data.append('Category', 'Subject');

  try{
    const sendRequest = await fetch(basedUrl+"/subject-add.php",{
              method: "POST",
              body: data,
          });

          const getResponse = await sendRequest.json();
         console.log(getResponse.statusCode)
          if(getResponse.statusCode === 200){
            setSnackbar({ children: 'Update successfully', severity: 'success' });
            dispatch(CLOSESUBFORM())
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
        open={formOpenType === 'subject'}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

        <DialogTitle id="scroll-dialog-title">Add Subject</DialogTitle>
        
      
        <DialogContent dividers={scroll === 'paper'}>
      <Box component="form" id ="frmAddSubject"  onSubmit={handleSubmitForm} nowrap>
    
        <Grid2 container spacing={3} sx ={{marginLeft:'-10px'}}>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorSubjectCode} name ="Subject_Code"  required label="Subject Code" variant="outlined" onKeyUp =  {handleChangeSubCode} />
        {errorSubjectCode === true ? (<FormHelperText id="component-helper-text">Subject code already exist
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorSubName} name ="Subject_Name" fullWidth required label="Subject Name" variant="outlined" onKeyUp =  {handleChangeSubName} />
        {errorSubName === true ? (<FormHelperText id="component-helper-text">Subject name must not be empty
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorUnits} type ="number" name ="Units" fullWidth required label="Units" variant="outlined" onKeyUp =  {handleChangeUnits} />
        {errorUnits === true ? (<FormHelperText id="component-helper-text">Units name must not be empty
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2>
             <Grid2 item xs={12}>
              <FormControl fullWidth>
               <TextField error = {errorAmount} type ="number" name ="Amount" fullWidth required label="Amount" variant="outlined" onKeyUp =  {handleChangeAmount} />
        {errorAmount === true ? (<FormHelperText id="component-helper-text">Units name must not be empty
        </FormHelperText>): (<></>)}
               </FormControl>
             </Grid2>
        </Grid2>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form ="frmAddSubject">SUBMIT</Button>
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