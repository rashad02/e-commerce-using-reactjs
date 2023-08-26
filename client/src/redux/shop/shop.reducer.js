import SHOP_DATA from "./Shop-data";
import { ShopActionTypes } from "./shop.types";

const INITIAL_STATE = {
    collections: SHOP_DATA,
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.SET_COLLECTION_ID:
            return {
                ...state,
                collectionId: action.payload,
            };
        default:
            return state;
    }
};

export default shopReducer;
