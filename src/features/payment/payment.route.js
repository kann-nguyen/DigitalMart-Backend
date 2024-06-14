const paymentRouter = require('express').Router();
const PaymentController = require('./payment.controller');

// paymentRouter.post('/pay', PaymentController.createPayReq);
paymentRouter.get('/return-pay', PaymentController.handleReturnPay);

module.exports = paymentRouter;