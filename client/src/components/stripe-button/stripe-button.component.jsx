import React from 'react';
import { connect } from 'react-redux';

import { setPromoList } from "../../redux/admin/admin.action";
import { updatePromo } from "../../redux/admin/admin.util";
import { addOrder } from "../../redux/order/order.util";

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || '';

const StripeCheckoutButton = ({ price, couponCode, setPromoList }) => {
    const priceForStripe = price;
    const publishableKey = "pk_test_bUGSkooKzcy1ct3SR4vccjjD00NYhSHUM0"


    const onToken = async token => {
        await axios({
            method: 'post',
            url: baseUrl + '/payment/',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(res => {

            new Promise((resolve, reject) => {
                addOrder(priceForStripe).then(response => {
                    if (couponCode) {
                        updatePromo(couponCode).then((res) => {
                        })
                    };
                    setPromoList();
                    resolve(response);
                });
            }).catch(error => {

                console.log("payment error: ", error);

            })
        })
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name='Daily solution'
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is ${price}`}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    setPromoList: () => dispatch(setPromoList())
})

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);