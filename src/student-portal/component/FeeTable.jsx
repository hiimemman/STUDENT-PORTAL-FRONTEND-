import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, useGridApiContext, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport  } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import { basedUrl } from '../../base-url/based-url';
import {PUT_FEE, PUT_TOTAL} from '../../slice/AddFeeSlice/AddFeeSlice'

const columns = [
    {
      field: 'name',
      headerName: 'Fee name',
      flex: 1,
      minWidth: 0,
      editable: false,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        flex: 1,
        minWidth: 0,
        editable: false,
    },
    {
        field: 'subtotal',
        headerName: 'Subtotal',
        flex: 1,
        minWidth: 0,
        editable: false,
    },
  ];

  const totalColumns = [
    {
      field: 'description',
      headerName: 'Description',
      width: 390,
      editable: false,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        width: 384,
        editable: false,
    },
  ];

  
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

export function FeeTable(){
  const dispatch = useDispatch();
    const [rows, setRows] = useState({});
    const [loading, isLoading] = useState(false);
    const [totalRows, setTotalRows] = useState([{id:1,description:"Total Payment", amount: 0}, {id:2, description:"Balance", amount: 0}]);
    const studentCurrentPage = useSelector(state => (state.studentSelectedPage.value));
      //Selected schedule
      const schedule = useSelector(state => state.scheduleSelection.value);
      

    const getAllData = async () =>{
        isLoading(true)
        try{ 
        
          //online api
            const sendRequest = await fetch(basedUrl+"/fee-table.php");
            const getResponse = await sendRequest.json();
            isLoading(false)
            if(getResponse.statusCode === 201){
            
            }else{
              //if succesfully retrieve data
              let tuitionFeeSubtotal = 0;
              let tuitionAmount = 0;
              let sumOfUnits = 0;
                //get amount per unit of tuition fee which has an id of 4
              getResponse.filter((res) => res.id == 4 ? tuitionAmount = res.amount : null)

              for(let i = 0; i < schedule.length; i++){
                // console.log(schedule[i][1])
                sumOfUnits += parseFloat(schedule[i]['units']);
              }
          
              tuitionFeeSubtotal = parseFloat(tuitionAmount) * parseFloat(sumOfUnits);
            
              for(let i = 0; i < getResponse.length; i++){
                if(getResponse[i]['id'] == 4){
                    getResponse[i]['subtotal'] = tuitionFeeSubtotal;
                }else{
                    getResponse[i]['subtotal'] = getResponse[i]['amount'];
                }
              }
              setRows(getResponse);
              isLoading(false)
            }
        }catch(e){
          console.error(e)
        }
      }
    
    useEffect(() =>{
        getAllData(); 
        return () => {

        }
    },[studentCurrentPage]);

    useEffect(() =>{
        isLoading(true)

        let totalPayment = 0;
        for(let i = 0; i < rows.length; i++){

            console.log(rows[i]['subtotal'])
           totalPayment = parseFloat(totalPayment) + parseFloat(rows[i]['subtotal']);
        }
        console.log(totalPayment)
        setTotalRows(totalRows => totalRows = [{id:1,description:"Total Payment", amount: totalPayment}, {id:2, description:"Balance", amount: totalPayment}] )
        isLoading(false);
        return() =>{
            isLoading(false);
        }
    },[rows])

    useEffect(() =>{
      dispatch(PUT_FEE(rows));
      
        return () => {}
    },[totalRows])

    useEffect(() =>{
      dispatch(PUT_TOTAL(totalRows));
      return () => {}
    },[totalRows])

    function CustomFooterStatusComponent (){
        return(<></>)
    }

    return(
        <>
        <Box sx ={{p:0}}>
        <Box sx={{ width: '100%' }}>
      <DataGrid
components={{ LoadingOverlay: LinearProgress, Footer: CustomFooterStatusComponent}}
loading = {loading}
        rows={rows}
        columns={columns}
       autoHeight
      />
    </Box>
    <Box sx={{  width: '50%' }}>
    <DataGrid
components={{ LoadingOverlay: LinearProgress, Footer: CustomFooterStatusComponent}}
loading = {loading}
        rows={totalRows}
        columns={totalColumns}
       autoHeight
      />
    </Box>
    </Box>
        </>
    )
}

