const mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
  id: String,
  username: String,
  email: String,
  password: String,
  type: String,
  createdAt: Date
})

let User = mongoose.model('users', UserSchema)

module.exports = User