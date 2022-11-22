import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const addFormFees = createSlice({
     name:'addFormFees',
     initialState,
     reducers:{
         ADDFEE: (state) =>{
            state.value= 'fee'
         },
         CLOSEFEEFORM: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDFEE, CLOSEFEEFORM } = addFormFees.actions
 
 export default addFormFees.reducer