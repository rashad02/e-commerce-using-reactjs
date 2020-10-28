const express = require('express');

const paymentRouter = express.Router();

const stripe = require('stripe')("sk_test_OLZS22WPVAtrxzMyM7ArLHql005uSeXc3p");



paymentRouter.post('/', async (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd',
        description: 'Charges for test checkout'
    }

    await stripe.charges.create(body, (stripeErr, stripeRes)=> {
      
        if(stripeErr) res.status(500).send({error: stripeErr});
        else res.status(200).send({success: stripeRes});
    })
});


module.exports = paymentRouter; 