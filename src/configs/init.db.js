const mongoose = require('mongoose');
const { createClient } = require('redis');
const { Repository, Schema } = require('redis-om')
const config = require('./config');

const redisClient = createClient({
    // password: config.redis.password,
    socket: {
        host: config.redis.host,
        port: config.redis.port
    },
    // username: config.redis.username
});

const productSchema = new Schema('product', {
    productId: { type: 'text' },
    productName: { type: 'text' }
}, {
    stopWords: []
});

const ProductRedisRepo = new Repository(productSchema, redisClient);

const connectDatabases = async () => {
    await mongoose.connect(config.mongo.uri);
    await redisClient.connect();
    await ProductRedisRepo.createIndex();
}

module.exports = {
    connectDatabases, redisClient, ProductRedisRepo
}