import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
 }
 
 export const registrationSelect = createSlice({
     name:'registrationSelection',
     initialState,
     reducers:{
        PUT_REGISTRATION: (state, action) =>{
            state.value = action.payload;
        },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { PUT_REGISTRATION } = registrationSelect.actions
 
 export default registrationSelect.reducer