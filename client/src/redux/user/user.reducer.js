
import {UserActionTypes} from "./user.types";


const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER: 
            return {
                ...state,
                currentUser:  action.payload,
                userType: action.payload && action.payload.type ? action.payload.type : 'user'
            }
        case UserActionTypes.TOGGLE_USER_TYPE: 
        return {
            ...state,
            userType: action.payload === 'user' ? 'admin' : 'user'
        } 
        default : return state;
    }
}

export default userReducer;