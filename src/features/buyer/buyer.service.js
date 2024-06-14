const BuyerRepo = require('./buyer.repo');

module.exports = {
    getBoughtProductList: async (userId) => {
        return await BuyerRepo.getBoughtProductList(userId);
    },
    updateLastBuyProduct: async (userId, productId) => {
        return await BuyerRepo.createOrUpdateLastBuy(userId, productId);
    }
}