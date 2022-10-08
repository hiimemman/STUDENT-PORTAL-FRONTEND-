import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const addCourse = createSlice({
     name:'addCourse',
     initialState,
     reducers:{
         ADDFORMCOURSE: (state) =>{
            state.value= 'course'
         },
         CLOSEFORM: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDFORMCOURSE, CLOSEFORM } = addCourse.actions
 
 export default addCourse.reducer