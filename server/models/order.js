const mongoose = require('mongoose')

let OrderSchema = mongoose.Schema({
    id: String,
    orderNo: String,
    itemPrice:Number,
    status: String,
    createdAt: Date
})

let Orders = mongoose.model('orders', OrderSchema)

module.exports = Orders