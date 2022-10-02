import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
 }
 
 export const subjectSelect = createSlice({
     name:'subjectSelection',
     initialState,
     reducers:{
        PUT_SUBJECT: (state, action) =>{
            state.value = action.payload;
        },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { PUT_SUBJECT } = subjectSelect.actions
 
 export default subjectSelect.reducer