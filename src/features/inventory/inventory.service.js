const redisRepo = require('../redis/redis.repo');

module.exports = {
    createInventory: async (inventory) => {
        let key = `inventory:${inventory.productId}`;
        let value = inventory;
        await redisRepo.jsonSet(key, '.', value);
    },
    updateInventory: async (productId, field, newValue) => {
        let key = `inventory:${productId}`;
        let path = `.${field}`;
        console.log(key, path);
        await redisRepo.jsonSet(key, path, newValue);
    },
    getInventory: async (productId) => {
        let key = `inventory:${productId}`;
        return await redisRepo.jsonGet(key);
    }
}