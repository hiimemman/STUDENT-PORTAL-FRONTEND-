import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    value:[]
 }
 
 export const scheduleSelection = createSlice({
     name:'scheduleSelection',
     initialState,
     reducers:{
        REMOVE_SCHEDULE: (state, action) =>{
         state.value = state.value.filter(items => items.id !== action.payload);
      },
      PUT_ALL_SCHEDULE: (state, action) =>{
         state.value = action.payload;
      },
      RESET_SCHEDULE: (state, action) =>{
         state.value = initialState;
      },
      PUT_SCHEDULE: (state, action) =>{
         console.log(typeof state.value.value)
         if(state.value.value !== undefined){
            console.log("test1")
            state.value = [...state.value.value, action.payload];
         }else{
            console.log("test2")
            state.value = [...state.value, action.payload];
         }
           
          
      },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { REMOVE_SCHEDULE,PUT_ALL_SCHEDULE,RESET_SCHEDULE, PUT_SCHEDULE } = scheduleSelection.actions
 
 export default scheduleSelection.reducer