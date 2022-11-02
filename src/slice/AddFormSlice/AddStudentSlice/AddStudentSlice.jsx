import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'student' IT RETURNS TRUE OR FALSE
 export const addStudent = createSlice({
     name:'addStudent',
     initialState,
     reducers:{
         ADDSTUDENT: (state) =>{
            state.value= 'student'
         },
         CLOSEFORM: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDSTUDENT, CLOSEFORM } = addStudent.actions
 
 export default addStudent.reducer