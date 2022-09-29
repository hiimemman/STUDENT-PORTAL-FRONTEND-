import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 
 export const openEmployeeTable = createSlice({
     name:'openEmployeeTable',
     initialState,
     reducers:{
         OPENSNACK: (state) =>{
        state.value = true
         },
         CLOSESNACK: (state) =>{
           state.value = false
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { OPENSNACK, CLOSESNACK } = openEmployeeTable.actions
 
 export default openEmployeeTable.reducer