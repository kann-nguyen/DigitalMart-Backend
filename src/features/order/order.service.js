const { NotFound } = require('../../utils/createError');
const { sendOrderInfo } = require('../nodemail/sendOrderInfo');
const OrderRepo = require('./order.repo');

module.exports = {
    getOrderOfUser: async (userId) => {
        const orders = await OrderRepo.getOrderByUserId(userId);
        return orders;
    },
    createOrder: async (userId, orderInfo) => {
        // console.log("create order ", orderInfo);
        const newOrder = await OrderRepo.createOrder(userId, orderInfo);
        // await sendOrderInfo(newOrder.user.email, newOrder);
        return newOrder;
    },
    getAllOrder: async () => {
        return await OrderRepo.getAllOrder();
    },
    getOrderById: async (orderId) => {
        const order = await OrderRepo.getOrderById(orderId);
        if (!order) throw NotFound(`Order with id ${orderId} is not existed!`);
        return order;
    },
    deleteOrderById: async (orderId) => {
        const result = await OrderRepo.deleteOrder(orderId);
        if (!result) throw BadRequest(`Order ${orderId} delete failed`);
    },
    getNumberOfOrders: async () => {
        return await OrderRepo.getNumberOfOrders();
    }
}