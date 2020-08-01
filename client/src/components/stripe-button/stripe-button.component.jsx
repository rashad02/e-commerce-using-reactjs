import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


const StripeCheckoutButton = ({ price }) => {
        const priceForStripe = price * 100;
        const publishableKey = "pk_test_bUGSkooKzcy1ct3SR4vccjjD00NYhSHUM0"

        const onToken = token => {
           axios({
               method: 'post',
               url: 'payment',
               data: {
                   amount: priceForStripe,
                   token
               }
           }).then(res => {
               alert("Payment successful!");
           }).catch(error=> {
               console.log("payment error: ", JSON.parse(error));

               alert("There is an issue with your payment. Please try later.")
           })
        }

        return (
            <StripeCheckout
                label= "Pay Now"
                name='Daily solution'
                billingAddress
                shippingAddress
                image= "https://svgshare.com/i/CUz.svg"
                description={`Your total is ${price}`}
                panelLabel='Pay Now'
                token= {onToken}
                stripeKey={publishableKey}
                />
        )
}

export default StripeCheckoutButton;