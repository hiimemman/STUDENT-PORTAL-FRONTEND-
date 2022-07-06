import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   session: sessionStorage.getItem('user'),
}

export const userInfo = createSlice({
    name:'user',
    initialState,
    reducers:{
        PUT_USER: (state, action) =>{
        sessionStorage.setItem("user", JSON.stringify(action.payload)); 
        let x = sessionStorage.getItem('user');// store session in storage
        state.session = x;
     
        },
        GET_USER: (state) =>{
             let x = sessionStorage.getItem('user')
             state.session = x;
        },
        REMOVE_USER: (state)=>{
            let x = sessionStorage.removeItem('user')
            state.session = null 
        },
    },
})


// Action creators are generated for each case reducer function
export const { PUT_USER, GET_USER, REMOVE_USER } = userInfo.actions

export default userInfo.reducer

