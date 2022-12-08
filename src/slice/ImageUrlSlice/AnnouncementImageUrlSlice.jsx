import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const addFormAnnouncementImageUrl = createSlice({
     name:'addFormAnnouncementImageUrl',
     initialState,
     reducers:{
         ADDIMAGEURl: (state, action) =>{
            state.value= action.payload
         },
         RESET: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDIMAGEURl, RESET } = addFormAnnouncementImageUrl.actions
 
 export default addFormAnnouncementImageUrl.reducer