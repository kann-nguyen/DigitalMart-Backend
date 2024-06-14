const { StatusCodes } = require('http-status-codes');
const InventoryService = require('./inventory.service');

module.exports = {
    createInventoryForProduct: async (req, res, next) => {
        try {
            await InventoryService.createInventory(req.body);
            res.status(StatusCodes.OK).json({});
        }
        catch (err) {
            next(err);
        }
    },
    // updateInventory: async (req, res, next) => {
    //     try {
    //         const { productId, field, value } = req.body
    //         await InventoryService.updateInventory(productId, field, value);
    //         res.status(StatusCodes.OK).json({});
    //     }
    //     catch (err) {
    //         next(err);
    //     }
    // },
    getInventoryOfProduct: async (req, res, next) => {
        try {
            const { productId } = req.params;
            const result = await InventoryService.getInventory(productId);
            res.status(StatusCodes.OK).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}