const { Category } = require('./category.model');
const Product = require('../product/product.model');
module.exports = {
    getAllCategory: async () => {
        return await Category.find({});
    },
    getById: async (id) => {
        return await Category.findById(id);
    },
    addCategory: async (category) => {
        const newCategory = await Category.create(category);
        return newCategory;
    },
    deleteCategory: async (name) => {
        const deletedCategory = await Category.findOneAndDelete({ name: name });
        return !deletedCategory ? false : true;
    },
    updateCategory: async (id, newName, url) => {
        let updateBody = {};
        if (newName) updateBody['name'] = newName;
        if (url) updateBody['image'] = url;
        return await Category.findByIdAndUpdate(id, updateBody, { new: true });
    },
    getNumberOfCategories: async () => {
        return await Category.countDocuments();
    }
}