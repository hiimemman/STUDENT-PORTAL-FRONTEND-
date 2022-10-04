import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const formState = createSlice({
     name:'isOpenForm',
     initialState,
     reducers:{
         OPEN: (state) =>{
        state.value = true
         },
         CLOSE: (state) =>{
           state.value = false
         },
         ADDEMPLOYEE: (state) =>{
            state.value= 'employee'
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { OPEN, CLOSE,ADDEMPLOYEE } = formState.actions
 
 export default formState.reducer