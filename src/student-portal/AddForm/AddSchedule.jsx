import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { basedUrl } from '../../base-url/based-url';
import {PUT_SCHEDULE} from '../../slice/AddSchedule/AddScheduleSlice';
import { useDispatch, useSelector } from 'react-redux';

export const AddScheduleForm = () =>{

//Selected schedule
const schedule = useSelector(state => state.scheduleSelection.value);
    //AddSchedule Form
const [open, setOpen] = useState(false);      

const dispatch = useDispatch();

const handleClickOpenAddScheduleForm = () => {
  setOpen((open) => open = true);
};

const handleCloseAddScheduleForm = () => {
  setOpen(false);
};

useEffect(() =>{

    return () =>{}
},[open])

  const [errorScheduleCode, setErrorScheduleCode] = useState(null);
  const [scheduleCodeHelperText, setScheduleCodeHelperText] = useState('');
  const [holdSelectedSchedule, setHoldSelectedSchedule] = useState({});
const handleChangeScheduleCode = async (event) =>{
  if((event.target.value).toString().length >= 20 ){
    setErrorScheduleCode((prev) => prev = true);
    setScheduleCodeHelperText('Invalid schedule code!');
  }else{
    try{
      const data = new FormData();
      data.append('ScheduleCode', event.target.value);
      const sendRequest = await fetch(basedUrl+"/exist-sched-code.php",{
        method: "POST",
        body: data,
    });
    
    // for (var pair of data.entries()) {
    //   console.log(pair[0]+ ' - ' + pair[1]); 
    // }
    const getResponse = await sendRequest.json();
 
    if(getResponse.statusCode === 200){
      setErrorScheduleCode((prev) => prev = false);
      
      if(schedule.length > 0){

        
        if(schedule.filter(item => item.id === getResponse.scheduleData.id).length > 0){
          setErrorScheduleCode((prev) => prev = true);
          setScheduleCodeHelperText((prev) => prev = "Schedule code has already been added to your schedule!");
        }else{
          if(schedule.filter(item => item.subject_name === getResponse.scheduleData.subject_name).length > 0){
            setErrorScheduleCode((prev) => prev = true);
            setScheduleCodeHelperText((prev) => prev = "This subject has already been added to your schedule!");
          }else{
            dispatch(PUT_SCHEDULE(getResponse.scheduleData));
          handleCloseAddScheduleForm();
          }
        }

      }else{
   
            dispatch(PUT_SCHEDULE(getResponse.scheduleData));
          handleCloseAddScheduleForm();
      }
      
    }else{
      setErrorScheduleCode((prev) => prev = true);
      setScheduleCodeHelperText((prev) => prev = "Schedule code doesn't exist!")
    }
    }catch(e){
      setErrorScheduleCode((prev) => prev = true);
      console.log(e)
      setScheduleCodeHelperText('Server problem!');
    }  
  } 
}

useEffect(() =>{
 return () =>{} 
},[errorScheduleCode, scheduleCodeHelperText])

  return (
    <>
     <div>
        <Button variant="text" color ="success" startIcon = {<MoreTimeIcon />} onClick ={handleClickOpenAddScheduleForm}>
        Add Schedule
        </Button>
      <Dialog open={open} onClose={handleCloseAddScheduleForm}>
        <DialogTitle>Add Schedule</DialogTitle>
        <DialogContent>
          <DialogContentText>
          To add a preferred schedule to your list, you need to copy and paste the schedule code of a specific schedule. You can view and search the schedules in the first table.
          </DialogContentText>
          <FormControl style ={{marginTop: '1.5rem'}} fullWidth error = {errorScheduleCode} required>
               <InputLabel variant ="standard" htmlFor="ScheduleCode">Schedule Code</InputLabel>
               <Input name ="ScheduleCode" autoFocus  id ="ScheduleCode" type ="number" required label = "Schedule Code" defaultValue = {''} onChange ={handleChangeScheduleCode} />
               {errorScheduleCode === true ? (<FormHelperText id="component-error-text" >{scheduleCodeHelperText}</FormHelperText>) : (<></>)}
           </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddScheduleForm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  )
}