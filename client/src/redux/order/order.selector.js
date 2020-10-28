import { createSelector} from 'reselect';

const selectOrder = state => state.order;

export const selectOrderItems = createSelector(
    [selectOrder],  order =>  {
        let orderItems = []
       
        orderItems =  order.orderItems.filter(item =>{
        return item && ( !order.orderFilter || order.orderFilter === 'All' || item.status === order.orderFilter)
        })

        return orderItems
    }
);

export const selectOrderFilter = createSelector(
    [selectOrder],  order =>  order.orderFilter
);

export const selectOrderStatus = createSelector(
    [selectOrder],  order =>  order.orderStatus
);
