const express = require('express');
const crypto = require("crypto");
const Orders = require('../models/order');

const orderRouter = express.Router();


orderRouter.post('/', (request, response) => {
    let responseData = {
      success: false,
      data: {},
      errors: []
    }
  
    if (request.body.itemPrice) {

        let order = {
            id : crypto.randomBytes(20).toString('hex'),
            orderNo: Math.floor(Math.random() * 1000000),
            itemPrice: request.body.itemPrice,
            status: 'Pending',
            createdAt: new Date()
        }
    
        Orders.create(order, function (errorCreate, documentCreate) {
        
            if (documentCreate && documentCreate.id) {
                responseData.success = true
                responseData.order = {orderId: documentCreate.id, orderNo : documentCreate.orderNo};
            } else {
            responseData.errors.push({type: 'default', message: 'Please try again.'})
            }
            response.status(200).send(responseData);
        })
         

       
    }else {
        responseData.errors.push({type: 'warning', message: 'The item Price is invalid. Please choose something else.'})

        response.status(200).send(responseData);
      
    } 
});


orderRouter.get('/', (request, response) => {
    let responseData = {
      success: false,
      data: {},
      errors: []
    },
    query = {};

    if(request.query && request.query.status) query.status = request.query.status;
  
        Orders.find(query, function (errorCreate, document) {
        
            if (document) {
                responseData.success = true
                responseData.orders = document;
            } else {
            responseData.errors.push({type: 'default', message: 'No order found!'})
            }
            response.status(200).send(responseData);
        })
});

orderRouter.put('/', (request, response) => {
    let responseData = {
      success: false,
      data: {},
      errors: []
    },
    requestData = request.body ? request.body : {}, 
    orderId = requestData && requestData.id ? requestData.id : '',
    orderStatus = requestData && requestData.status ? requestData.status : '',
    query = {};

    if(orderId) query.id = orderId;
  
    if(orderId && orderStatus) {
        Orders.find(query, function (errorCreate, document) {
        
            if (document) {
                let updateData = {
                    status: orderStatus
                };

                Orders.updateOne(query, {$set: updateData}, (error, document) => {
                    
                    if(document) {
                        responseData.success = true;
                        responseData.order = {status: orderStatus, id: orderId};

                        response.status(200).send(responseData);
                    } else {
                        responseData.errors.push({type: 'default', message: 'Update failed!'});
                        response.status(200).send(responseData);
                    }
                    
                })
            } 
        })
    }
    
});




module.exports = orderRouter;