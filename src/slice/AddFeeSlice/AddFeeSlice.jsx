import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:[],
 }
 
 export const feeSelection = createSlice({
     name:'feeSelection',
     initialState,
     reducers:{
        PUT_FEE: (state, action) =>{
           state.value =  [action.payload];
        },
        RESET_FEE: (state, action) =>{
         state.value = initialState;
      },
      PUT_TOTAL: (state, action) =>{
        state.value = [...state.value, action.payload];
     }
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { PUT_FEE, RESET_FEE,PUT_TOTAL } = feeSelection.actions
 
 export default feeSelection.reducer