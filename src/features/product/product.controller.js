const { StatusCodes } = require('http-status-codes');
const productService = require('./product.service');
const InventoryService = require('../inventory/inventory.service');
const PAGE_SIZE = 9999999;
module.exports = {
    getById: async (req, res, next) => {
        const product = await productService.getById(req.params.id);
        res.status(200).json(product);
    },
    getAllProduct: async (req, res, next) => {
        const pageNumber = req.query.page || 1;
        const result = await productService.getAll({ pageNumber: pageNumber, pageSize: PAGE_SIZE });
        res.status(200).json({
            products: result,
            page: 1,
            totalPages: 1,
            hasPrevPage: false,
            hasNextPage: false
        });
    },
    addProduct: async (req, res, next) => {
        try {
            const productReqDto = req.body;
            const newProduct = {
                name: productReqDto.name,
                description: productReqDto.description,
                price: productReqDto.price,
                brand: productReqDto.brand,
                category: productReqDto.category,
                metadata: productReqDto.metadata
            };
            const newProductInventory = {
                threshold: productReqDto.threshold,
                stock: productReqDto.stock
            }
            const result = await productService.createProduct(newProduct, newProductInventory, req.files);
            res.status(201).json(result);
        }
        catch (err) {
            next(err)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            await productService.deleteProduct(req.params.id);
            res.status(200).json("Success");
        }
        catch (err) {
            next(err)
        }
    },
    updateProduct: async (req, res, next) => {
        const { id } = req.params;
        console.log(req.body.data);
        try {
            const updatedProduct = await productService.updateProduct(id, req.body.data, req.files, req.body.deletedImages);
            res.status(200).json(updatedProduct);
        }
        catch (err) {
            next(err);
        }
    },
    getByCategory: async (req, res, next) => {
        const pageNumber = req.query.page || 1;
        const result = await productService.getByCategory(req.params.category, { pageNumber: pageNumber, pageSize: PAGE_SIZE });
        res.status(200).json({
            products: result,
            page: 1,
            totalPages: 1,
            hasPrevPage: false,
            hasNextPage: false
        });
    },
    getProductToCache: async (req, res, next) => {
        await productService.getProductToCache();
        res.status(200).json({});
    },
    getTenProductPerCategory: async (req, res, next) => {
        try {
            console.log("asdfsdaf");
            const result = await productService.getTenProductPerCategory();
            res.status(StatusCodes.OK).json(result);
        }
        catch (err) {
            next(err);
        }
    },
    searchProduct: async (req, res, next) => {
        try {
            const { name } = req.params;
            // console.log(name);
            const result = await productService.searchProduct(name);
            res.status(StatusCodes.OK).json(result);
        }
        catch (err) {
            next(err);
        }
    },
    getProductWithInventory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await productService.getById(id);
            const inventory = await InventoryService.getInventory(id);
            res.status(StatusCodes.OK).json({
                product: product,
                inventory: inventory
            })
        }
        catch (err) {
            next(err);
        }
    },
    getAllProductAdmin: async (req, res, next) => {
        try {
            const result = await productService.getAllProductAdmin();
            res.status(StatusCodes.OK).json(result)
        }
        catch (err) {
            next(err);
        }
    }
}