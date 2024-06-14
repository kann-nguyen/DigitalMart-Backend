const Authentication = require('../../middlewares/checkAuth');
const CONSTANT = require('../../utils/constant');
const BuyerController = require('./buyer.controller');
const buyerRoute = require('express').Router();

buyerRoute.get('/:userId', Authentication(CONSTANT.ROLE.CUSTOMER), BuyerController.getBoughtProductList);
buyerRoute.put('/user/:userId/product/:productId', Authentication(CONSTANT.ROLE.CUSTOMER), BuyerController.updateLastBuy);

module.exports = buyerRoute;