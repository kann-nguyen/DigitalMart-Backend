const { redisClient } = require('../../configs/init.db');

module.exports = {
    scan: async (pattern) => {
        let matchingKeysCount = 0;
        let keys = [];

        const recursiveScan = async (cursor = '0') => {
            const [newCursor, matchingKeys] = await redisClient.scan(cursor, 'MATCH', pattern);
            cursor = newCursor;

            matchingKeysCount += matchingKeys.length;
            keys = keys.concat(matchingKeys);

            if (cursor === '0') {
                return keys;
            } else {
                return await recursiveScan(cursor);
            }
        }
    },
    jsonGet: (key) => {
        return redisClient.json.get(key);
    },
    jsonSet: (key, path, value) => {
        return redisClient.json.set(key, path, value);
    },
    set: async (key, value) => {
        await redisClient.set(key, value)
    },
    get: async (key) => {
        return await redisClient.get(key);
    },
    del: async (key) => {
        await redisClient.del(key);
    },
    hgetall: async (key) => {
        return await redisClient.hGetAll(key);
    },
    hset: async (hash, key, value) => {
        await redisClient.hSet(hash, key, value);
    },
    hget: async (hash, key) => {
        return await redisClient.hGet(hash, key);
    },
    hdel: async (hash, key) => {
        await redisClient.hDel(hash, key);
    }
}