import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   value: false,
}

export const menuStudentState = createSlice({
    name:'isOpen',
    initialState,
    reducers:{
        OPEN: (state) =>{
       state.value = true
        },
        CLOSE: (state) =>{
          state.value = false
        },
    },
})


// Action creators are generated for each case reducer function
export const { OPEN, CLOSE } = menuStudentState.actions

export default menuStudentState.reducer

