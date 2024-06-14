const { verifyToken } = require('../../utils/auth');
const { BadRequest } = require('../../utils/createError');
const TokenRepo = require('./token.repo');

module.exports = {
    generateRefreshToken: async(userId, role) => {
        const existedToken = await TokenRepo.getByUserId(userId);
        if (existedToken) {
            try {
                const _ = verifyToken(existedToken.refreshToken);
                return existedToken.refreshToken;
            }
            catch (err) {
                await TokenRepo.deleteByUserId(userId);
            }
        }
        return await TokenRepo.generateRefreshToken(userId, role);
    },
    generateAccessToken: async (userId, role) => {
        return TokenRepo.generateAccessToken(userId, role);
    },
    deleteByUserId: async (userId) => {
        await TokenRepo.deleteByUserId(userId);
    },
    deleteByToken: async (userId, refreshToken) => {
        if(!(await TokenRepo.checkTokenExisted(userId, refreshToken))) throw BadRequest("RefreshToken is not existed!");
        await TokenRepo.deleteByUserId(userId);
    }
}