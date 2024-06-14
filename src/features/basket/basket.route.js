const Authentication = require('../../middlewares/checkAuth');
const Validation = require('../../middlewares/validation');
const CONSTANT = require('../../utils/constant');
const BasketController = require('./basket.controller');
const { updateBasketReqValidate, checkoutBasketReqValidate } = require('./basket.validation');
const basketRouter = require('express').Router();

basketRouter.get('/', Authentication(CONSTANT.ROLE.CUSTOMER), BasketController.getBasket);
// basketRouter.post('/:userId/:productId', BasketController.addItem);
basketRouter.put('/', Authentication(CONSTANT.ROLE.CUSTOMER), Validation(updateBasketReqValidate), BasketController.updateBasket);
basketRouter.post('/checkout', Authentication(CONSTANT.ROLE.CUSTOMER), Validation(checkoutBasketReqValidate), BasketController.checkoutBasket);
module.exports = basketRouter;