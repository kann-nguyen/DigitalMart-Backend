const productRouter = require('express').Router();
const uploadMulter = require('../../configs/multer');
const Authentication = require('../../middlewares/checkAuth');
const Validation = require('../../middlewares/validation');
const CONSTANT = require('../../utils/constant');
const ProductController = require('./product.controller');
const { addProductValidate, updateProductValidate } = require('./product.validation');

// productRouter.get('/:id', getById);
productRouter.post('/', uploadMulter.array('images'), Validation(addProductValidate), ProductController.addProduct);
productRouter.delete('/:id', Authentication(CONSTANT.ROLE.ADMIN), ProductController.deleteProduct);
productRouter.put('/:id', Authentication(CONSTANT.ROLE.ADMIN), uploadMulter.array('newImages'), Validation(updateProductValidate), ProductController.updateProduct);
productRouter.get('/category/:category', ProductController.getByCategory);
productRouter.get('/all', ProductController.getAllProduct);
productRouter.get('/ten-product-per-category', ProductController.getTenProductPerCategory);
productRouter.get('/search/:name', ProductController.searchProduct);
productRouter.get('/product-detail/:id', ProductController.getProductWithInventory);
productRouter.get('/all-by-admin', Authentication(CONSTANT.ROLE.ADMIN), ProductController.getAllProductAdmin);
module.exports = productRouter;