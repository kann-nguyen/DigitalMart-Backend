const Product = require('./product.model');
const { redisClient } = require('../../configs/init.db')

const getAll = async (options) => {
    const { pageNumber, pageSize } = options;
    const result = await Product.find({ isPublished: true });
    return result;
}

const createProduct = async (product) => {
    // console.log("repo", product);
    const newProduct = await Product.create(product);
    return newProduct;
}

const getProductById = async (id) => {
    // const product = await Product.findById(id).populate('category', 'name -_id');
    const product = await Product.findById(id);
    return product;
}

const updateProduct = async (id, updateBody, newImages, deletedImages) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateBody, { new: true }).populate('category', 'name -_id');
    if (newImages.length > 0) updatedProduct.images.push(...newImages);
    if (deletedImages.length > 0) deletedImages.forEach(deletedImage => {
        const index = updatedProduct.images.indexOf(deletedImage);
        if (index !== -1) {
            updatedProduct.images.splice(index, 1);
        }
    });
    await updatedProduct.save();
    return updatedProduct;
}

const deleteProduct = async (id) => {
    const deleteProduct = await Product.findByIdAndDelete(id);
    return !deleteProduct ? false : true;
}

const getByCategory = async (category, options) => {
    const { pageNumber, pageSize } = options;
    const result = await Product.find({ isPublished: true });
    return result;
}

const getProductToCache = async () => {
    const products = await Product.find({}, "name stock threshold");
    products.forEach(async p => {
        await redisClient.set(`product:${p.id}`, JSON.stringify(p));
    });
}

const updateProductImage = async (id, newImages, deletedImages) => {
    const product = await Product.findById(id);
    if (newImages.length > 0) product.images.push(...newImages);
    if (deletedImages.length > 0) deletedImages.forEach(deletedImage => {
        const index = product.images.indexOf(deletedImage);
        if (index !== -1) {
            product.images.splice(index, 1);
        }
    });
    await product.save();
}

const getTenProductByCategory = async (category) => {
    const result = await Product.find({ category: category, isPublished: true }).sort({ createdAt: -1 }).limit(10);
    return result;
}

const getAllByAdmin = async () => {
    return result = await Product.find({});
}

module.exports = productRepo = {
    getAll,
    getProductById,
    getByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductToCache,
    updateProductImage,
    getTenProductByCategory,
    getAllByAdmin
}