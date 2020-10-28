
import {OrderActionTypes} from './action.types';

export const setOrderItems = orderItems => {

    const action = {
        type: OrderActionTypes.SET_ORDER_ITEMS,
        payload: orderItems 
    }
    return action;
}

export const setOrderFilter = filterValue => {

    const action = {
        type: OrderActionTypes.SET_ORDER_FILTER,
        payload: filterValue 
    }
    return action;
}

export const setOrderStatus = orderStatus => {

    const action = {
        type: OrderActionTypes.SET_ORDER_STATUS,
        payload: orderStatus 
    }
    return action;
}
