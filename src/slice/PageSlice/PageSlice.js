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
        STUDENT: (state) =>{
            state.value = 'student'
        },
        SUBJECT: (state) =>{
            state.value = 'subject'
        },
        FACULTY: (state) =>{
            state.value = 'faculty'
        },
        COURSE: (state) =>{
            state.value = 'course'
        },
    },
})


// Action creators are generated for each case reducer function
export const { DASHBOARD, EMPLOYEE, STUDENT, SUBJECT,FACULTY,COURSE } = pageState.actions

export default pageState.reducer

