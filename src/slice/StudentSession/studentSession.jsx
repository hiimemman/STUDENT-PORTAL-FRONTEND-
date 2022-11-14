import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   session: sessionStorage.getItem('student'),
}

export const studentInfo = createSlice({
    name:'student',
    initialState,
    reducers:{
        PUT_STUDENT: (state, action) =>{
        sessionStorage.setItem('student', JSON.stringify(action.payload)); 
        let x = sessionStorage.getItem('student');// store session in storage
        state.session = x;
     
        },
        GET_STUDENT: (state) =>{
             let x = sessionStorage.getItem('student')
             state.session = x;
        },
        REMOVE_STUDENT: (state)=>{
            let x = sessionStorage.removeItem('student')
            state.session = null 
        },
    },
})


// Action creators are generated for each case reducer function
export const { PUT_STUDENT, GET_STUDENT, REMOVE_STUDENT } = studentInfo.actions

export default studentInfo.reducer

