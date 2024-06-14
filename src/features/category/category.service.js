const { BadRequest } = require('../../utils/createError');
const uploadService = require('../upload/upload.service');
const categoryRepo = require('./category.repo');

module.exports = {
    getAll: async () => {
        return await categoryRepo.getAllCategory();
    },
    addCategory: async (category, image) => {
        const imageUrl = await uploadService.uploadSingleFile(image);
        category.image = imageUrl;
        return await categoryRepo.addCategory(category);
    },
    deleteCategory: async (name) => {
        let result = await categoryRepo.deleteCategory(name);
        if (!result) throw BadRequest("Bad Request");
    },
    updateCategory: async (id, newName, file) => {
        let url;
        if (file) url = await uploadService.uploadSingleFile(file)
        return await categoryRepo.updateCategory(id, newName, url);
    },
    getNumberOfCategories: async () => {
        return await categoryRepo.getNumberOfCategories();
    }
}