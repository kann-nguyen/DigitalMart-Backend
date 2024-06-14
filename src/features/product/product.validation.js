const Joi = require('joi');
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('../../utils/validators');

const addProductValidate = (req) => {
    console.log(req.body)
    console.log(req.files)
    const addProductSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().min(1).required(),
        price: Joi.number().required(),
        brand: Joi.string(),
        category: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        metadata: Joi.object().default({}),
        threshold: Joi.number().min(1).required(),
        stock: Joi.number().min(1).required(),
        isPublished: Joi.boolean().default(false)
    })
    return addProductSchema.validate(req);
}

const updateProductValidate = (req) => {
    const updateProductSchema = Joi.object({
        data: Joi.object().keys({
            name: Joi.string().min(3),
            description: Joi.string(),
            price: Joi.number(),
            brand: Joi.string(),
            stock: Joi.number().min(1),
            threshold: Joi.number().min(1),
            category: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
            metadata: Joi.object().default({}),
            isPublished: Joi.boolean()
        }),
        deletedImages: Joi.array().default([])
    })
    return updateProductSchema.validate(req);
}

module.exports = {
    addProductValidate, updateProductValidate
}

