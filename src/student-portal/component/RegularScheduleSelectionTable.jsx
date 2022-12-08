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

export const RegularScheduleSelectionTable = (props) =>{

  
      //Selected schedule
const schedule = useSelector(state => state.scheduleSelection.value);

//Total  units
const [totalUnits, setTotalUnits] = useState(0);

const dispatch = useDispatch();



  const columns = [
    { field: 'sched_code', headerName: 'Sched Code', width: 100 },
    { field: 'subject_name', headerName: 'Subject Name', width: 130 },
    { field: 'units', headerName: 'Units', width: 50 },
    { field: 'schedule_day', headerName: 'Days', width: 150 },
    { field: 'schedule_time', headerName: 'Time', width: 350 },
    { field: 'semester', headerName: 'Semester', width: 180 },
    { field: 'professor_initial', headerName: 'Professor', width: 150 },
  ];

  useEffect(() =>{

    return () =>{}
  },[schedule])
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
        components={{LoadingOverlay: LinearProgress,}} rows={schedule} columns={columns} autoHeight pageSize={5} 
      />
      <Stack direction="row" spacing ={2}>
      <Typography variant = "h6">Total Units:</Typography>
      <Typography variant="h6">{totalUnits}</Typography>
      </Stack>
    </div>
  )
}