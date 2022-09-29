import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'failed',
 }
 
 export const statusEmployeeTable = createSlice({
     name:'statusEmployeeTable',
     initialState,
     reducers:{
         SUCCESSSNACK: (state) =>{
        state.value = 'success'
         },
         FAILEDSNACK: (state) =>{
           state.value = 'failed'
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { SUCCESSSNACK, FAILEDSNACK } = statusEmployeeTable.actions
 
 export default statusEmployeeTable.reducer