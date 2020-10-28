import {AdminActionTypes} from "./action.types"


export const isActivePromo = isActive => {
    const action = {
        type: AdminActionTypes.PROMO_ACTIVE_TOGGLE,
        payload: isActive || false
    }

    return action;
}

export const showPromotionChildNode = () => {
    const action = {
        type: AdminActionTypes.SHOW_PROMOTION_CHILD_NODE,
    }

    return action;
}

export const setPromoList = promotions => {
    const action = {
        type: AdminActionTypes.SET_PROMO_LIST,
        payload: promotions
    }


    return action;
}

