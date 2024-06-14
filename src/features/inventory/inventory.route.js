const inventoryRoute = require('express').Router();
const Authentication = require('../../middlewares/checkAuth');
const Validation = require('../../middlewares/validation');
const CONSTANT = require('../../utils/constant');
const InventoryController = require('./inventory.controller');
const { UpdateInventoryReqValidate } = require('./inventory.validation');

// inventoryRoute.post('/', InventoryController.createInventoryForProduct);
// inventoryRoute.put('/', Authentication(CONSTANT.ROLE.ADMIN), Validation(UpdateInventoryReqValidate), InventoryController.updateInventory);
inventoryRoute.get('/:productId', InventoryController.getInventoryOfProduct);
module.exports = inventoryRoute;