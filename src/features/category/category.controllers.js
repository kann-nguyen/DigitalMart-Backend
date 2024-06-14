const { StatusCodes } = require('http-status-codes');
const categoryService = require('./category.service');

module.exports = {
    getAll: async (req, res) => {
        res.status(200).json(await categoryService.getAll());
    },
    addCategory: async (req, res, next) => {
        try {
            const image = req.file;
            const newCategory = await categoryService.addCategory(req.body, image);
            res.status(200).json(newCategory);
        }
        catch (err) {
            next(err)
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await categoryService.deleteCategory(req.params.name);
            res.status(200).json();
        }
        catch (err) {
            next(err);
        }
    },
    updateCategory: async (req, res, next) => {
        try {
            const image = req.file;
            res.status(200).json(await categoryService.updateCategory(req.params.id, req.body.name, image));
        }
        catch (err) {
            next(err);
        }
    },
    getNumberOfCategories: async (req, res, next) => {
        try {
            res.status(StatusCodes.OK).json(await categoryService.getNumberOfCategories());
        }
        catch (err) {
            next(err)
        }
    }
}