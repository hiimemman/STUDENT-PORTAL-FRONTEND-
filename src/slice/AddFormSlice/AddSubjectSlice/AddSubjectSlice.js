import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const addFormSub = createSlice({
     name:'addFormFor',
     initialState,
     reducers:{
         ADDSUBJECT: (state) =>{
            state.value= 'subject'
         },
         CLOSESUBFORM: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDSUBJECT, CLOSESUBFORM } = addFormSub.actions
 
 export default addFormSub.reducer