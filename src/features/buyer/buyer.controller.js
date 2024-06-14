const { StatusCodes } = require('http-status-codes');
const BuyerService = require('./buyer.service');

module.exports = {
    getBoughtProductList: async (req, res, next) => {
        try {
            const {userId} = req.params;
            var result = await BuyerService.getBoughtProductList(userId);
            return res.status(StatusCodes.OK).json(result);
        }
        catch(err){
            next(err);
        }
    },
    updateLastBuy: async (req, res, next) => {
        try {
            const { userId, productId } = req.params;
            var result = await BuyerService.updateLastBuyProduct(userId, productId);
            return res.status(StatusCodes.OK).json(result);
        }
        catch (err){
            next(err);
        }
    }
}