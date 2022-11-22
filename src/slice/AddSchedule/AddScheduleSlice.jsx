import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:[],
 }
 
 export const scheduleSelection = createSlice({
     name:'scheduleSelection',
     initialState,
     reducers:{
        PUT_SCHEDULE: (state, action) =>{
           state.value = [...state.value, action.payload];
        },
        REMOVE_SCHEDULE: (state, action) =>{
         state.value = state.value.filter(items => items.id !== action.payload);
      },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { PUT_SCHEDULE, REMOVE_SCHEDULE } = scheduleSelection.actions
 
 export default scheduleSelection.reducer