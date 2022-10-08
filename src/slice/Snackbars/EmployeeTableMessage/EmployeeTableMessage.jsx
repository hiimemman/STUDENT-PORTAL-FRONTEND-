import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'There was an error on your request',
 }
 
 export const messageEmployeeTable = createSlice({
     name:'messageEmployeeTable',
     initialState,
     reducers:{
         SUCCESSMESSAGESNACK: (state, action) =>{
        state.value = action.payload
         },
         FAILEDMESSAGESNACK: (state) =>{
           state.value = 'There was an error on your request'
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { SUCCESSMESSAGESNACK, FAILEDMESSAGESNACK } = messageEmployeeTable.actions
 
 export default messageEmployeeTable.reducer