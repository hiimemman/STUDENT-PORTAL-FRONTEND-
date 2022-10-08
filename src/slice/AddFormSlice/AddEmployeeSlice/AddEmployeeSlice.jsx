import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const addFormFor = createSlice({
     name:'addFormFor',
     initialState,
     reducers:{
         ADDEMPLOYEE: (state) =>{
            state.value= 'employee'
         },
         CLOSEFORM: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDEMPLOYEE, CLOSEFORM } = addFormFor.actions
 
 export default addFormFor.reducer