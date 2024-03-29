import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import CheckoutItem from "../../components/checkout/checkout-item.component";
import CheckOutSummary from "../../components/checkout/checkout-summary.component";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selector";

import "./checkout.styles.scss";

const Checkout = ({ cartItems, total }) => {
    return (
        <div className="checkout-page">
            <div className="col-md-12 order-details">
                <div className="col-md-7">
                    <div className="checkout-header">
                        <div className="header-block">
                            <span >Product </span>
                        </div>
                        <div className="header-block">
                            <span >Description </span>
                        </div>
                        <div className="header-block">
                            <span >Quantity </span>
                        </div>
                        <div className="header-block">
                            <span >Price </span>
                        </div>
                        <div className="header-block">
                            <span >Remove </span>
                        </div>
                    </div>
                    {
                        cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
                    }
                    <div className="total"><span>TOTAL: {total}</span></div>
                </div>

                <div className="col-md-4 order-summary">
                    <CheckOutSummary />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(Checkout);