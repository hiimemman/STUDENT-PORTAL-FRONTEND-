import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
 }
 //SELECT A FORM TYPE TO OPEN IN ADD FORM
//EXAMPLE FORM TYPE === 'employee' IT RETURNS TRUE OR FALSE
 export const addFormAnnouncement = createSlice({
     name:'addFormAnnouncement',
     initialState,
     reducers:{
         ADDANNOUNCEMENT: (state) =>{
            state.value= 'announcement'
         },
         CLOSEANNOUNCEMENTFORM: (state) =>{
            state.value = initialState
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { ADDANNOUNCEMENT, CLOSEANNOUNCEMENTFORM } = addFormAnnouncement.actions
 
 export default addFormAnnouncement.reducer