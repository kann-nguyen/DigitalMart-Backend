const Token = require('./token.model');
const crypto = require('crypto');
const config = require('../../configs/config');
const { generateToken } = require('../../utils/auth');

module.exports = {
    generateRefreshToken: async (userId, role) => {
        const newRefreshToken = await Token.create({
            userId: userId,
            refreshToken: generateToken({userId: userId, role: role}, {expiresIn: config.jwt.REF_TOKEN_TTL}),
        });
        return newRefreshToken.refreshToken;
    },
    generateAccessToken: async (userId, role) => {
        return generateToken({userId: userId, role: role}, {expiresIn: config.jwt.ACC_TOKEN_TTL});
    },
    getByUserId: async (userId) => {
        return await Token.findOne({userId: userId});
    },
    deleteByUserId: async (userId) => {
        await Token.deleteMany({userId: userId});
    },
    checkTokenExisted: async (userId, refreshToken) => {
        const tokens = await Token.findOne({userId: userId, refreshToken: refreshToken});
        return tokens ? true : false;
    }
}