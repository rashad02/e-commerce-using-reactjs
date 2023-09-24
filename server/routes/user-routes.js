const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const User = require('../models/users');

let userRoutes = express.Router()


userRoutes.get('/', async (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.query.id) {
    let document = await User.findOne({ id: request.query.id }).exec();

    // User.findOne({ id: request.query.id }, (error, document) => {

    if (!document) {
      responseData.errors.push({ type: 'critical', message: error })

      response.status(500).send(responseData);
    } else {
      if (!document) {
        responseData.errors.push({ type: 'warning', message: 'No user exists with this username.' })

        response.status(500).send(responseData);
      } else {
        responseData.user = { userId: document.id, email: document.email, type: document.type };
        responseData.success = true;
        // response.send(responseData);

        response.status(200).send(responseData);
      }
    }
    // })
  } else {
    responseData.errors.push({ type: 'critical', message: 'Username not provided.' })

    response.status(200).send(responseData);
  }
})
// Login
userRoutes.post('/login', async (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.body.email) {
    let document = await User.findOne({ email: request.body.email }).exec();

    // User.findOne({ email: request.body.email }, (error, document) => {

    // if (!document) {
    //   responseData.errors.push({ type: 'critical', message: error })

    //   response.json(responseData)
    // } else {
    if (!document) {
      responseData.errors.push({ type: 'warning', message: 'No user exists with this username.' })

      response.json(responseData)
    } else {
      bcrypt.compare(request.body.password, document.password, function (hashError, hashPasswordCheck) {
        if (!hashError) {

          responseData.user = { userId: document.id, type: document.type, email: document.email };
          responseData.success = true

          response.status(200).send(responseData);
        } else {

          responseData.errors.push({ type: 'critical', message: 'Please try again.' })

          response.json(responseData)
        }
      })
    }
    // }
    // })
  } else {
    responseData.errors.push({ type: 'critical', message: 'Username not provided.' })

    response.json(responseData)
  }
})

// Register
userRoutes.post('/register', async (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.body.username != '') {
    // Check user exists
    let isUserExist = await User.findOne({ email: request.body.email }).exec();
    // User.findOne({ email: request.body.email }, (error, document) => {
    if (!isUserExist) {
      bcrypt.hash(request.body.password, 10, async function (hashError, hashPassword) {
        if (!hashError) {
          let user = {
            id: crypto.randomBytes(20).toString('hex'),
            username: request.body.username,
            email: request.body.email,
            password: hashPassword,
            type: request.body.type || 'user',
            createdAt: new Date()
          }

          // User.create(user, function (errorCreate, documentCreate) {
          let documentCreate = await User.create([user])
          if (documentCreate && user.id) {
            responseData.success = true
            responseData.user = { userId: user.id, email: user.email, type: user.type };
          } else {
            responseData.errors.push({ type: 'default', message: 'Please try again.' })
          }
          response.status(200).send(responseData);
          // })
        } else {
          responseData.errors.push({ type: 'default', message: 'Please try again.' });

          response.status(500).send(responseData);
        }
      })

    } else {
      // User already exists

      responseData.errors.push({ type: 'warning', message: 'The email is taken. Please choose something else.' })

      response.status(500).send(responseData);
    }
    // })
  } else {
    responseData.errors.push({ type: 'critical', message: 'Username not provided.' })

    response.status(500).send(responseData);
  }
})

// Export
module.exports = userRoutes