import * as React from 'react';
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { AddScheduleForm } from '../AddForm/AddSchedule';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { REMOVE_SCHEDULE } from '../../slice/AddSchedule/AddScheduleSlice';
import { Stack } from '@mui/system';
     //Toolbar
     function CustomToolbarSection() {
      return (<>
    
        <GridToolbarContainer>
        <AddScheduleForm />
           <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
        </GridToolbarContainer>
        </>
      );
    }

export const ScheduleSelectionTable = (props) =>{

  
      //Selected schedule
const schedule = useSelector(state => state.scheduleSelection.value);

//Total  units
const [totalUnits, setTotalUnits] = useState(0);

const dispatch = useDispatch();

function LongMenu(props) {
  // const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(REMOVE_SCHEDULE(props.id));
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
        <RemoveIcon />
         
      </IconButton>
    
         
       
    </div>
  );
}

  const columns = [
    {
      field: 'id',
      headerName: '',
      flex: 1,
        minWidth: 0,
      editable: false,
      renderCell: (cellValues) => {
        return(
        <>
      <LongMenu id ={cellValues.value} />
        </>
        );//end of return
      }
    },
    { field: 'sched_code', headerName: 'Sched Code',  flex: 1,
    minWidth: 0, },
    { field: 'subject_name', headerName: 'Subject Name',  flex: 1,
    minWidth: 0, },
    { field: 'units', headerName: 'Units',  flex: 1,
    minWidth: 0, },
    { field: 'schedule_day', headerName: 'Days',  flex: 1,
    minWidth: 0, },
    { field: 'schedule_time', headerName: 'Time',  flex: 1,
    minWidth: 0,},
    { field: 'semester', headerName: 'Semester',  flex: 1,
    minWidth: 0, },
    { field: 'professor_initial', headerName: 'Professor',  flex: 1,
    minWidth: 0,},
  ];

  
  useEffect(() => {
    let sumOfUnits = 0;
    for(let i = 0; i < schedule.length; i++){
      // console.log(schedule[i][1])
      sumOfUnits += parseFloat(schedule[i]['units']);
    }
    setTotalUnits(totalUnits => totalUnits = sumOfUnits);
  return () => { }
  }, [schedule])
   
  useEffect(() =>{

    return () =>{
      
    }
  },[totalUnits])

  return (
    <div style={{ width: '100%'}}>
      <DataGrid
        components={{Toolbar: CustomToolbarSection,  LoadingOverlay: LinearProgress,}} rows={schedule} columns={columns} autoHeight pageSize={5} 
      />
      <Stack direction="row" spacing ={2}>
      <Typography variant = "h6">Total Units:</Typography>
      <Typography variant="h6">{totalUnits}</Typography>
      </Stack>
    </div>
  )
}