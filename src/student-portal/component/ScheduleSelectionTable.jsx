import * as React from 'react';
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { AddScheduleForm } from '../AddForm/AddSchedule';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';

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


  const columns = [
    { field: 'sched_code', headerName: 'Sched Code', width: 100 },
    { field: 'subject_name', headerName: 'Subject Name', width: 130 },
    { field: 'units', headerName: 'Units', width: 50 },
    { field: 'schedule_day', headerName: 'Days', width: 150 },
    { field: 'schedule_time', headerName: 'Time', width: 350 },
    { field: 'semester', headerName: 'Semester', width: 180 },
    { field: 'professor_initial', headerName: 'Professor', width: 180 },
  ];

  
  useEffect(() => {
  
  
    return () => {
      
    }
  }, [schedule])
   

  return (
    <div style={{ height: '400', width: '100%' }}>
    
      <DataGrid
        components={{Toolbar: CustomToolbarSection,  LoadingOverlay: LinearProgress,}} rows={schedule} columns={columns} autoHeight
      />
     
    </div>
  )
}