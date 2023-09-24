const express = require('express');
const crypto = require("crypto");
const Promo = require('../models/promo');

const promoRouter = express.Router();


promoRouter.post('/', async (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    }

    if (request.body.promoCode) {
        let document = await Promo.findOne({ promoCode: request.body.promoCode }).exec();
        // Promo.findOne(, (error, document) => {
        if (!document) {
            let promo = {
                id: crypto.randomBytes(20).toString('hex'),
                promoCode: request.body.promoCode,
                startDate: request.body.startDate,
                endDate: request.body.endDate,
                discountRate: request.body.discountRate,
                useTime: request.body.useTime,
                isActive: request.body.isActive,
                createdAt: new Date()
            }

            let documentCreate = await Promo.create([promo])
            // Promo.create(promo, function (errorCreate, documentCreate) {

            if (documentCreate && promo.id) {
                responseData.success = true
                responseData.promo = { promoId: documentCreate.id, promoCode: documentCreate.promoCode };
            } else {
                responseData.errors.push({ type: 'default', message: 'Please try again.' })
            }
            response.status(200).send(responseData);
            // })
        } else {

            responseData.errors.push({ type: 'warning', message: 'The promo code already exist. Please choose something else.' })

            response.status(200).send(responseData);
        }
        //   })
    } else {
        responseData.errors.push({ type: 'critical', message: 'Promo code not provided.' })

        response.status(200).send(responseData);
    }
})



promoRouter.get('/', async (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    },
        query = {};

    if (request.query && request.query.promoCode) {
        query.promoCode = request.query.promoCode
    }
    let document = await Promo.find(query).exec();
    // Promo.find(query, (error, document) => {

    let promotions = [];

    if (document.length > 0) {
        // document.forEach(promo => {
        //     let promoData = {
        //         id : promo.id,
        //         promoCode: promo.promoCode,
        //         startDate: promo.startDate,
        //         endDate: promo.endDate,
        //         discountRate: promo.discountRate ,
        //         useTime: request.body.useTime,
        //         isActive: promo.isActive
        //     }

        //     promotions.push(promoData);

        // })
        responseData.promotions = document || [];
        responseData.success = true
        response.status(200).send(responseData);

    } else {

        responseData.errors.push({ type: 'warning', message: 'The promotion found. Please choose something else.' })

        response.status(200).send(responseData);
    }
    //   })

})

promoRouter.put('/', async (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    },
        promoId = request.body && request.body.promoId ? request.body.promoId : '',
        updateData = request.body && request.body.promoData ? request.body.promoData : {},
        query = {};

    if (promoId && updateData) {
        query.id = promoId;

        let document = await Promo.findOne(query).exec();
        // Promo.findOne(query, (error, document) => {

        if (document && document.useTime > 0) updateData.useTime = document.useTime - 1;

        if (document) {
            Promo.updateOne(query, { $set: updateData }, (error, document) => {
                if (document) {

                    console.log("document", document);
                    responseData.promoCode = updateData.promoCode || "";
                    responseData.success = true;

                    response.status(200).send(responseData);

                } else {

                    responseData.errors.push({ type: 'warning', message: 'The promotion found. Please choose something else.' })

                    response.status(200).send(responseData);
                }
            })
        }

        // })
    }
})



module.exports = promoRouter;