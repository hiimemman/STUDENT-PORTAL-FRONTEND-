import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
 }
 
 export const sectionSelect = createSlice({
     name:'sectionSelection',
     initialState,
     reducers:{
        PUT_SECTION: (state, action) =>{
            state.value = action.payload;
        },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { PUT_SECTION } = sectionSelect.actions
 
 export default sectionSelect.reducer