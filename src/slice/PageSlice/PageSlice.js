import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   value: 'dashboard',
}

export const pageState = createSlice({
    name:'pageState',
    initialState,
    reducers:{
        DASHBOARD: (state) =>{    
       state.value = 'dashboard'
        },
        EMPLOYEE: (state) =>{
        state.value = 'employee'
        },
    },
})


// Action creators are generated for each case reducer function
export const { DASHBOARD, EMPLOYEE } = pageState.actions

export default pageState.reducer

