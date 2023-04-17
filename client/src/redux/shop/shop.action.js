import { ShopActionTypes } from "./shop.types";

export const setCollectionId = (collectionId) => ({
    type: ShopActionTypes.SET_COLLECTION_ID,
    payload: collectionId,
});
