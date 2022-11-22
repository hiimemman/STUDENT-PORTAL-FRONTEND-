import * as React from 'react';
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
const columns = [
  { field: 'sched_code', headerName: 'Sched Code', width: 100 },
  { field: 'subject_name', headerName: 'Subject Name', width: 130 },
  { field: 'units', headerName: 'Units', width: 50 },
  { field: 'schedule_day', headerName: 'Days', width: 150 },
  { field: 'schedule_time', headerName: 'Time', width: 350 },
  { field: 'semester', headerName: 'Semester', width: 180 },
  { field: 'professor_initial', headerName: 'Professor', width: 180 },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function SchedulesChoicesTable(props) {
  return (
    <div style={{  width: '100%' }}>
      <DataGrid
       autoHeight
        rows={props.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: CustomToolbarSection, LoadingOverlay: LinearProgress,}}
        
      />
    </div>
  );
}

 //Toolbar
 function CustomToolbarSection() {
    return (<>
  
      <GridToolbarContainer>
         <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
      </>
    );
  }