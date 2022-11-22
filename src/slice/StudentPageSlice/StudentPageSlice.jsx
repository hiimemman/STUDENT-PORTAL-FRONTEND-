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
        CURRICULUM: (state) =>{    
            state.value = 'curriculum'
        },
        SCHEDULE: (state) =>{    
            state.value = 'schedule'
        },
        NULL: (state) =>{
            state.value = initialState;
        }
    },
})


// Action creators are generated for each case reducer function
export const { DASHBOARD, PRE_REGISTRATION, CURRICULUM, SCHEDULE, NULL } = studentPageState.actions

export default studentPageState.reducer

