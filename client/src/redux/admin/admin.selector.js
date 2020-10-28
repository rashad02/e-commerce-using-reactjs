import { createSelector} from 'reselect';

const selectAdmin = state => state.admin;

export const selectPromotionList = createSelector(
    [selectAdmin],  admin =>  admin.promotionList || []
);

export const selectIsActivePromo = createSelector(
    [selectAdmin],  admin =>  admin.isActive
);

export const selectPromotionChildNode = createSelector(
    [selectAdmin],  admin =>  admin.promotionChildNode
);

export const selectPromotionAmount = createSelector(
    [selectAdmin],  admin =>  {
        let total = 0;
        if(admin.promotionList) {
            admin.promotionList.forEach(element => {
                total += element.discountRate;
            });
        }
        return total;
    }
);
