import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
 }
 
 export const studentSelect = createSlice({
     name:'employeeSelection',
     initialState,
     reducers:{
        PUT_STUDENT: (state, action) =>{
            state.value = action.payload;
        },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { PUT_STUDENT } = studentSelect.actions
 
 export default studentSelect.reducer