const storeUser = (state = sessionStorage.getItem('user'), action ) =>{

    switch (action.type){
        case 'USER_INFO':   
        sessionStorage.setItem('user', JSON.stringify(action)); 
        let user = sessionStorage.getItem('user');// store session in storage
        return state = user;
        case 'GET_USER':
        state = sessionStorage.getItem('user')
        return state;
        case 'REMOVE_USER':
        state = sessionStorage.removeItem('user')
        return null
        default:
        return state;
    }
}

export default storeUser;