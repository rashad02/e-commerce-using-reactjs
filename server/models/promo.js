const mongoose = require('mongoose')

let PromoSchema = mongoose.Schema({
    id: String,
    promoCode: String,
    startDate:Date,
    endDate: Date,
    discountRate: Number,
    useTime: String,
    isActive: Boolean,
    createdAt: Date
})

let Promo = mongoose.model('promo', PromoSchema)

module.exports = Promo