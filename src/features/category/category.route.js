const uploadMulter = require('../../configs/multer');
const Authentication = require('../../middlewares/checkAuth');
const Validation = require('../../middlewares/validation');
const CONSTANT = require('../../utils/constant');
const CategoryController = require('./category.controllers');
const { CategoryReqValidate, UpdateCategoryReqValidate } = require('./category.validation');

const categoryRouter = require('express').Router();

categoryRouter.get('/', CategoryController.getAll);
categoryRouter.post('/', uploadMulter.single('image'), Validation(CategoryReqValidate), CategoryController.addCategory);
categoryRouter.delete('/:name', Validation(CategoryReqValidate), CategoryController.deleteCategory);
categoryRouter.put('/:id', uploadMulter.single('image'), Validation(UpdateCategoryReqValidate), CategoryController.updateCategory)
categoryRouter.get('/number-of-categories', CategoryController.getNumberOfCategories)

module.exports = categoryRouter;