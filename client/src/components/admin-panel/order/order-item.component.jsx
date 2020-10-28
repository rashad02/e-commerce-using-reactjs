import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import {setOrderStatus} from "../../../redux/order/order.action";
import {selectOrderStatus} from "../../../redux/order/order.selector";
import {updateOrderItem} from '../../../redux/order/order.util';

import './orders.styles.scss';


const OrderItem = ({key, item, serialNo, orderStatus,setOrderStatus}) => {

    const handleSubmit =(event) => {

       const status =  event.target.value;
       const orderId = item.id;


       if(status && orderId) {
        new Promise((resolve, reject) => {
            updateOrderItem(orderId, status).then((response) => {
                setOrderStatus(response);
                item.status = response.status;
                resolve(response);
            });
        });
       }



    }
    
    return (
        <>
            <td className="serialNo">
               {serialNo}
            </td>
            <td className="orderNo">
                {item.orderNo}
            </td>
            <td className="price">
               {item.itemPrice}
            </td>
            <td className="action">
                        <input className="filter-button" type="submit" onClick={handleSubmit} value={"Confirm"} />
                        <input className="filter-button" type="submit" onClick={handleSubmit} value={"Cancel"} />
            </td>
            <td className="status">
               { orderStatus && orderStatus.id === item.id  && orderStatus.status ? orderStatus.status.toUpperCase() :  item.status.toUpperCase()}
            </td>
        </>
    )
}


const mapStateToProps = createStructuredSelector({
    orderStatus: selectOrderStatus,
})

const mapDispatchToProps = dispatch => ({
    setOrderStatus: status => dispatch(setOrderStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);