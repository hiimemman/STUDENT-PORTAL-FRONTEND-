import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   value: null,
}

export const professorPageState = createSlice({
    name:'professorPageState',
    initialState,
    reducers:{
        DASHBOARD: (state) =>{    
       state.value = 'dashboard'
        },
        PROFILE: (state) =>{    
            state.value = 'profile'
        },
        SCHEDULE: (state) =>{    
            state.value = 'schedule'
        },
        GRADING: (state) =>{    
            state.value = 'grading'
        },
        NULL: (state) =>{
            state.value = initialState;
        }
    },
})


// Action creators are generated for each case reducer function
export const { DASHBOARD, PROFILE, SCHEDULE,GRADING, NULL } = professorPageState.actions

export default professorPageState.reducer

