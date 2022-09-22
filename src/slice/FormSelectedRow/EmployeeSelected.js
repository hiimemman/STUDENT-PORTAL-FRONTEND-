import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
 }
 
 export const employeeSelect = createSlice({
     name:'employeeSelection',
     initialState,
     reducers:{
        PUT_EMPLOYEE: (state, action) =>{
            state.value = action.payload;
        },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { PUT_EMPLOYEE } =employeeSelect.actions
 
 export default employeeSelect.reducer