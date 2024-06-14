const { StatusCodes } = require('http-status-codes');
const PaymentService = require('./payment.service');
const OrderService = require('../order/order.service');
const { sendOrderInfo } = require('../nodemail/sendOrderInfo');
module.exports = {
    createPayReq: async (req, res, next) => {
        const vnpUrl = PaymentService.createPaymentUrl();
        res.redirect(vnpUrl);
    },
    handleReturnPay: async (req, res, next) => {
        // console.log("Body request", req.body)
        // console.log("Params request", req.params)
        // console.log("Headers", req.headers);
        // console.log("Queries", req.query);
        try {
            const params = req.query;
            const { orderId, status } = PaymentService.getOrderIdAndTransactionStatus(params);
            if (status === '00') {
                const newOrder = await OrderService.getOrderById(orderId);
                await sendOrderInfo(newOrder.user.email, newOrder);
                res.redirect(`http://localhost:5173/customer-bill-info/${newOrder.id}`)
            } else {
                await OrderService.deleteOrderById(orderId);
                res.status(StatusCodes.OK).json('/');
            }
        }
        catch (err) {
            next(err)
        }
    }
}