const BuyerList = require('./buyer.model');

module.exports = {
    getBoughtProductList: async (userId) => {
        var result = await BuyerList.find({buyerId: userId});
        return result;
    },
    createOrUpdateLastBuy: async (userId, productId) => {
        var result = await BuyerList.findOneAndUpdate(
            {buyerId: userId, productId: productId}, 
            {$set: {lastBuy: new Date()}},
            {upsert: true}
        );
        return result;
    }
}