import Paper from '@mui/material/Paper';
import { height } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';



export function EmployeeView(){

    //Selected Employee
const employee = useSelector(state => state.employeeSelected.value)

    return(
        <>
        <div className="h-56 grid grid-cols-3 gap-4 content-start ...">
            <div id ="profielpic" className ="" >
               <img src={employee.profile_url} className ="h-64 w-64"alt = {""}/>
             </div>
             
        </div>
        </>
    )
}