import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 
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
         EMPLOYEE: (state) =>{
            state.value= 'employee'
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { OPEN, CLOSE } = formState.actions
 
 export default formState.reducer