import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   value: false,
}

export const menuState = createSlice({
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
export const { OPEN, CLOSE } = menuState.actions

export default menuState.reducer

