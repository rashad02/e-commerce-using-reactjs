import React, { Component } from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import {getOrders} from "../../../redux/order/order.util";
import {setOrderItems, setOrderFilter} from '../../../redux/order/order.action';
import {selectOrderItems, selectOrderFilter} from "../../../redux/order/order.selector";

import OrderItem from './order-item.component';

import {Table} from 'react-bootstrap';
import './orders.styles.scss';



class OrderPage extends Component {

    handleSubmit = event => {
       let filterValue = event.target.value;

       const {setOrderFilter} =this.props;

        if(filterValue) {
         
            if(filterValue === 'Cancelled') filterValue = "Cancel";
            if(filterValue === 'Confirmed') filterValue = "Confirm";
            setOrderFilter(filterValue);         
          
        }

    }

    componentDidMount(){

        const {setOrderItems} =this.props;

        const userId = localStorage.getItem('userId')
        
        if (userId && userId !== 'undefined' && userId !== '') {
            new Promise((resolve, reject) => {
                getOrders().then((response) => {
                    setOrderItems(response);
                    resolve(response);
                });
            });
        }
    }
    render(){

        const {orderItems, orderFilter} = this.props;

        return(
            <div className="order-list-container">
                <div className="filter">
                        <input className={`${orderFilter === 'All' || !orderFilter ? 'selected' : ''} filter-button`} type="submit" onClick={this.handleSubmit} value={"All"} />
                        <input className={`${orderFilter === 'Pending' ? 'selected' : ''} filter-button`} type="submit" onClick={this.handleSubmit} value={"Pending"} />
                        <input  className={`${orderFilter === 'Confirmed' ? 'selected' : ''} filter-button`} type="submit" onClick={this.handleSubmit} value={"Confirmed"} />
                        <input  className={`${orderFilter === 'Cancelled' ? 'selected' : ''} filter-button`} type="submit" onClick={this.handleSubmit} value={"Cancelled"} />
                </div>
                <div className="table-container">
                <Table responsive className="item-table">
                    <thead  className="table-header">
                        <tr className="table-row">
                            <th className="serialNo">SL</th>
                            <th className="orderNo">Order No</th>
                            <th className="price">Item Price</th>
                            <th className="action">Action</th>
                            <th className="status">Status</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        
                        
                        {
                            orderItems.filter((item,index) => item ).map((item,index)=>(
                                <tr className="table-row">  <OrderItem key={item.id} item = {item} serialNo={index + 1}  />  </tr>
                          ))
                        }
                    
                           
    
                        
                       
                    </tbody>
                </Table>
                </div>
                {/* {promotionList.filter((item,index) => item ).map((item,index)=>(
                              <PromoItem key={item.id} item = {item} serialNo={index + 1}  />  
                        ))} */}
                       
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    orderItems: selectOrderItems,
    orderFilter: selectOrderFilter
})

const mapDispatchToProps = dispatch => ({
    setOrderItems: items => dispatch(setOrderItems(items)),
    setOrderFilter: filter => dispatch(setOrderFilter(filter))
})


export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);