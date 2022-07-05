import { combineReducers } from 'redux';
import authReducer from './isAuth';
import storeUser from './sessionUser';
import menuState from './MenuState'

const allReducers = combineReducers({
    isAuth: authReducer,
    userInfo: storeUser,
    menuState: menuState,
})

export default allReducers;