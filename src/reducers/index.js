import { combineReducers } from 'redux';
import authReducer from './isAuth';
import storeUser from './sessionUser';

const allReducers = combineReducers({
    isAuth: authReducer,
    userInfo: storeUser 
})

export default allReducers;