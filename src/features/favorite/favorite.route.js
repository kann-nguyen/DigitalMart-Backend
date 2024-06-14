const Authentication = require('../../middlewares/checkAuth');
const CONSTANT = require('../../utils/constant');
const FavoriteController = require('./favorite.controller');
const favoriteRouter = require('express').Router();

favoriteRouter.get('/', Authentication(CONSTANT.ROLE.CUSTOMER), FavoriteController.getFavoriteOfUser);
favoriteRouter.post('/', Authentication(CONSTANT.ROLE.CUSTOMER), FavoriteController.addProductToList);
favoriteRouter.delete('/:productId', Authentication(CONSTANT.ROLE.CUSTOMER), FavoriteController.removeFromList);

module.exports = favoriteRouter;    