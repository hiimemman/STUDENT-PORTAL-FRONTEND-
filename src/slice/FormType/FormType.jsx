import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
 }
 


 export const formType = createSlice({
     name:'formType',
     initialState,
     reducers:{
         EMPLOYEE: (state) =>{
        state.value = 'employee'
         },
         DEFAULT: (state) =>{
            state.value = null
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { DEFAULT, EMPLOYEE } = formType.actions
 
 export default formType.reducer