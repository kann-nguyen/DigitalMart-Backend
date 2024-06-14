const { Schema, Entity, Repository } = require('redis-om');
const { redisClient } = require('../../configs/init.db');
class Inventory extends Entity { }

const inventorySchema = new Schema(Inventory, {
    productId: { type: 'text' },
    productName: { type: 'text' },
    stock: { type: 'number' },
    threshold: { type: 'number' }
});

const InventoryRepo = new Repository(inventorySchema, redisClient);
await InventoryRepo.createIndex()
module.exports = {
    InventoryRepo
}