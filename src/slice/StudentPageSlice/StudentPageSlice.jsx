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
        GRADES: (state) =>{    
            state.value = 'grades'
        },
        BALANCE: (state) =>{    
            state.value = 'balance'
        },
        PROFILE: (state) =>{    
            state.value = 'profile'
        },
        NULL: (state) =>{
            state.value = initialState;
        }
    },
})


// Action creators are generated for each case reducer function
export const { DASHBOARD, PRE_REGISTRATION, CURRICULUM, SCHEDULE, GRADES, BALANCE, PROFILE, NULL } = studentPageState.actions

export default studentPageState.reducer

