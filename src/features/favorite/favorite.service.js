const { BadRequest } = require('../../utils/createError');
const redisRepo = require('../redis/redis.repo');

module.exports = {
    getFavoriteOfUser: async (userId) => {
        let productList = [];
        const favoriteList = await redisRepo.hgetall(`favorite:${userId}`);
        if (!favoriteList) return { userId: userId, items: [] };
        for (const key of Object.keys(favoriteList)) {
            let productString = await redisRepo.hget(`favorite:${userId}`, key);
            productList.push(JSON.parse(productString));
        }
        return { userId: userId, items: productList };
    },
    addProductToFavorite: async (userId, product) => {
        const productId = product._id;
        await redisRepo.hset(`favorite:${userId}`, `product:${productId}`, JSON.stringify(product));
    },
    removeProductFromFavorite: async (userId, productId) => {
        await redisRepo.hdel(`favorite:${userId}`, `product:${productId}`);
    }
}