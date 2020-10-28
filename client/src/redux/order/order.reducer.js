import {OrderActionTypes} from "./action.types";

const INITIAL_STATE = {
    orderItems: []
};

const orderReducer =(state = INITIAL_STATE, action) => {
    switch(action.type) {
        case OrderActionTypes.SET_ORDER_ITEMS: 
        return {
            ...state,
            orderItems: action.payload || []
        } 
        case OrderActionTypes.SET_ORDER_FILTER: 
            return{
                ...state,
                orderFilter: action.payload
            }
        case OrderActionTypes.SET_ORDER_STATUS: 
            return {
                ...state,
                orderStatus: action.payload
            }
        default: 
        return state
        
    }
}

export default orderReducer;