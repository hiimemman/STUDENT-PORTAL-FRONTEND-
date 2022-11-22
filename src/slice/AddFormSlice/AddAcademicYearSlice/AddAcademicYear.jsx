import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const addFormAcadYear = createSlice({
     name:'addFormAcadYear',
     initialState,
     reducers:{
         ADDACADEMICYEAR: (state) =>{
            state.value= 'academic year'
         },
         CLOSEACADFORM: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDACADEMICYEAR, CLOSEACADFORM } = addFormAcadYear.actions
 
 export default addFormAcadYear.reducer