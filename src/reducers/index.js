import { combineReducers } from 'redux';
import authReducer from './isAuth';

const allReducers = combineReducers({
    isAuth: authReducer
})

export default allReducers;