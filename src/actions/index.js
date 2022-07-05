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


export const removeUserInfo = () =>{
    return{
        type: 'REMOVE_USER'
    }
}

export const openMenu = () =>{
    return{
        type: 'OPEN'
    }
}

export const closeMenu = () =>{
    return{
        type: 'CLOSE'
    }
}