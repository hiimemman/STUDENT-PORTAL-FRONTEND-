import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const addFaculty = createSlice({
     name:'addFaculty',
     initialState,
     reducers:{
         ADDFORMFACULTY: (state) =>{
            state.value= 'faculty'
         },
         CLOSEFORM: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDFORMFACULTY, CLOSEFORM } = addFaculty.actions
 
 export default addFaculty.reducer