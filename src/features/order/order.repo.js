const Order = require('./order.model');

module.exports = {
    getAllOrder: async () => {
        const orders = await Order.find({})
            .populate({
                path: 'items',
                populate: { path: 'product' }
            })
            .exec();
        return orders;
    },
    getOrderByUserId: async (userId) => {
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'items',
                populate: { path: 'product' }
            })
            .exec();
        return orders;
    },
    createOrder: async (userId, orderInfo) => {
        const newOrder = await (await Order.create({ user: userId, ...orderInfo })).populate({
            path: 'items',
            populate: { path: 'product' }
        });
        await newOrder.populate('user');
        return newOrder;
    },
    getOrderById: async (orderId) => {
        const order = await Order.findById(orderId).populate({
            path: 'items',
            populate: { path: 'product' }
        }).populate('user');
        return order;
    },
    deleteOrder: async (orderId) => {
        const result = await Order.findByIdAndDelete(orderId);
        return !result ? false : true;
    },
    getNumberOfOrders: async () => {
        const result = await Order.countDocuments()
        return result;
    }
}