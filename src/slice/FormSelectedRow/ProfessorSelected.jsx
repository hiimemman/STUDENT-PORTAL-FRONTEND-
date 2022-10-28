import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
 }
 
 export const professorSelect = createSlice({
     name:'professorSelection',
     initialState,
     reducers:{
        PUT_PROFESSOR: (state, action) =>{
            state.value = action.payload;
        },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { PUT_PROFESSOR } = professorSelect.actions
 
 export default professorSelect.reducer