const Authentication = require('../../middlewares/checkAuth');
const Validation = require('../../middlewares/validation');
const CONSTANT = require('../../utils/constant');
const OrderController = require('./order.controller');
const { createOrderReqValidate } = require('./order.validation');
const orderRouter = require('express').Router();

orderRouter.get('/', Authentication(CONSTANT.ROLE.CUSTOMER), OrderController.getOrderOfUser);
orderRouter.get('/all', Authentication(CONSTANT.ROLE.ADMIN), OrderController.getAllOrder);
// orderRouter.post('/', Authentication(CONSTANT.ROLE.CUSTOMER), Validation(createOrderReqValidate), OrderController.createOrder);
orderRouter.get('/number-of-orders', OrderController.getNumberOfOrder)
orderRouter.get('/:id', OrderController.getOrderbyId);

module.exports = orderRouter;