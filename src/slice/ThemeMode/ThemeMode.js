import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: sessionStorage.getItem("theme"),
 }
 
 export const themeMode = createSlice({
     name:'themeMode',
     initialState,
     reducers:{
         DARK: (state) =>{
        sessionStorage.setItem("theme", 'darkTheme');
        state.value = 'darkTheme'
         },
         LIGHT: (state) =>{
            sessionStorage.setItem("theme", 'lightTheme');
            state.value = 'lightTheme'
         },
     },
 })
 
 
 // Action creators are generated for each case reducer function
 export const { DARK, LIGHT } = themeMode.actions
 
 export default themeMode.reducer