import {AdminActionTypes} from "./action.types";


const INITIAL_STATE = {
    promotionList: []
};

const adminReducer =(state = INITIAL_STATE, action) => {
    switch(action.type) {
        case AdminActionTypes.PROMO_ACTIVE_TOGGLE: 
        return {
            ...state,
            isActive: action.payload
        }
        case AdminActionTypes.SHOW_PROMOTION_CHILD_NODE: 
        return {
            ...state,
            promotionChildNode: state.promotionChildNode ? false: true
        }
        case AdminActionTypes.SET_PROMO_LIST: 
        return{
            ...state,
            promotionList: action.payload || []
        }
        default: 
        return state
        
    }
}

export default adminReducer;