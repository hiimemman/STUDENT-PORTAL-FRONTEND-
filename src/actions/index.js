export const login = () =>{
    return{
        type: 'SIGN_IN'
    }
}

export const logout = () =>{
    return{
        type: 'SIGN_OUT'
    }
}

export const storeUserInfo = (value) =>{
    return{
        type: 'USER_INFO',
        value: value
    }
}

export const getUserInfo = () =>{
    return{
        type: 'GET_USER'
    }
}