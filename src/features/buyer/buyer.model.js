const mongoose = require('mongoose');
const { Schema } = mongoose;

const buyerListSchema = new Schema({
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'products'
    },
    lastBuy: {
        type: Date,
        required: true
    }
})
buyerListSchema.index({buyerId: 1, productId: 1});
const BuyerList = mongoose.model('buyerLists', buyerListSchema);
module.exports = BuyerList;