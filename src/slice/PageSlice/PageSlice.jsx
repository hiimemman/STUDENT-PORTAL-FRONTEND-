import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   value: null,
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
        PROFESSOR: (state) =>{
            state.value = 'professor'
        },
        STUDENT: (state) =>{
            state.value = 'student'
        },
        STUDENTREGISTRATION: (state) =>{
            state.value = 'student registration'
        },
        SUBJECT: (state) =>{
            state.value = 'subject'
        },
        FACULTY: (state) =>{
            state.value = 'department'
        },
        COURSE: (state) =>{
            state.value = 'course'
        },
        SECTION: (state) =>{
            state.value = 'section'
        },
        FEE: (state) =>{
            state.value = 'payment'
        },
        ACADEMICYEAR: (state) =>{
            state.value = 'academic year'
        },
        SEMESTER: (state) =>{
            state.value = 'semester'
        },
        ANNOUNCEMENT: (state) =>{
            state.value = 'announcement'
        },
        PROFILE: (state) =>{
            state.value = 'profile'
        },
        HOMEPAGE: (state) =>{
            state.value = 'homepage'
        },

        ACTIVITY: (state) =>{
            state.value = 'activity log'
        },
        
        NULL: (state) =>{
            state.value = initialState;
        }
    },
})


// Action creators are generated for each case reducer function
export const { DASHBOARD, EMPLOYEE, PROFESSOR, STUDENT, SUBJECT,FACULTY,COURSE,ACADEMICYEAR, SECTION,FEE, ANNOUNCEMENT, PROFILE,HOMEPAGE, STUDENTREGISTRATION, SEMESTER, ACTIVITY, NULL } = pageState.actions

export default pageState.reducer

 