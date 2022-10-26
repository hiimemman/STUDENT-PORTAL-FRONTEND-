import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const addProfessor = createSlice({
     name:'addProfessor',
     initialState,
     reducers:{
         ADDFORMPROFESSOR: (state) =>{
            state.value= 'professor'
         },
         CLOSEFORM: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDFORMPROFESSOR, CLOSEFORM } = addProfessor.actions
 
 export default addProfessor.reducer