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
      PUT_ALL_SCHEDULE: (state, action) =>{
         state.value = action.payload;
      },
      RESET_SCHEDULE: (state, action) =>{
         state.value = initialState;
      },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { PUT_SCHEDULE, REMOVE_SCHEDULE,PUT_ALL_SCHEDULE,RESET_SCHEDULE } = scheduleSelection.actions
 
 export default scheduleSelection.reducer