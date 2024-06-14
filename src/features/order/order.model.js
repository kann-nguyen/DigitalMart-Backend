const mongoose = require('mongoose');
const { BadRequest } = require('../../utils/createError');
const { removeVersionKey } = require('../../configs/db.plugin');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    subTotalPrice: {
        type: Number,
        required: true
    }
}, {
    _id: false
})

orderItemSchema.pre('save', async function (next) {
    const product = await mongoose.model('products').findById(this.product);
    if (!product) {
        return next(BadRequest('Product is not existed!'));
    }
    if (this.subTotalPrice !== product.price * this.quantity) next(BadRequest("SubTotalPrice is not valid"));
    next();
})

const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        index: true
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})

orderSchema.pre('save', async function (next) {
    const totalPrice = this.items.reduce((acc, item) => acc + item.subTotalPrice, 0);
    if (this.totalPrice !== totalPrice) next(BadRequest('TotalPrice is not valid'));
    next();
})
orderSchema.plugin(removeVersionKey);
const Order = mongoose.model('orders', orderSchema);

module.exports = Order;