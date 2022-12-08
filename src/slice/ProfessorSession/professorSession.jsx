import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   session: sessionStorage.getItem('professor'),
}

export const professorInfo = createSlice({
    name:'professor',
    initialState,
    reducers:{
        PUT_PROFESSOR: (state, action) =>{
        sessionStorage.setItem("professor", JSON.stringify(action.payload)); 
        let x = sessionStorage.getItem('professor');// store session in storage
        state.session = x;
     
        },
        GET_PROFESSOR: (state) =>{
             let x = sessionStorage.getItem('professor')
             state.session = x;
        },
        REMOVE_PROFESSOR: (state)=>{
            let x = sessionStorage.removeItem('professor')
            state.session = null 
        },
    },
})


// Action creators are generated for each case reducer function
export const { PUT_PROFESSOR, GET_PROFESSOR, REMOVE_PROFESSOR } = professorInfo.actions

export default professorInfo.reducer

