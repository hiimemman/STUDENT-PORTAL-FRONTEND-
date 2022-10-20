import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const addSection = createSlice({
     name:'addFormFor',
     initialState,
     reducers:{
         ADDSECTION: (state) =>{
            state.value= 'section'
         },
         CLOSESECTIONFORM: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDSECTION, CLOSESECTIONFORM } = addSection.actions
 
 export default addSection.reducer