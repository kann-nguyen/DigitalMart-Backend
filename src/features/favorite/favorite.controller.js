const { StatusCodes } = require('http-status-codes');
const FavoriteService = require('./favorite.service');

module.exports = {
    getFavoriteOfUser: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            res.status(StatusCodes.OK).json(await FavoriteService.getFavoriteOfUser(userId));
        }
        catch (err) {
            next(err);
        }
    },
    addProductToList: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            await FavoriteService.addProductToFavorite(userId, req.body);
            res.status(StatusCodes.OK).json(await FavoriteService.getFavoriteOfUser(userId));
        }
        catch (err) {
            next(err);
        }
    },
    removeFromList: async (req, res, next) => {
        try {
            const { productId } = req.params;
            const userId = req.headers['x-userId'];
            await FavoriteService.removeProductFromFavorite(userId, productId);
            res.status(StatusCodes.OK).json(await FavoriteService.getFavoriteOfUser(userId));
        }
        catch (err) {
            next(err)
        }
    }
}