import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   value: null,
}

export const studentPageState = createSlice({
    name:'studentPageState',
    initialState,
    reducers:{
        DASHBOARD: (state) =>{    
       state.value = 'dashboard'
        },
        PRE_REGISTRATION: (state) =>{    
            state.value = 'pre_registration'
        },
        NULL: (state) =>{
            state.value = initialState;
        }
    },
})


// Action creators are generated for each case reducer function
export const { DASHBOARD, PRE_REGISTRATION, NULL } = studentPageState.actions

export default studentPageState.reducer

