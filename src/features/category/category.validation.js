const Joi = require('joi');

const CategoryReqValidate = (req) => {
    const commonSchema = Joi.object({
        name: Joi.string().required(),
    })
    return commonSchema.validate(req);
}

const UpdateCategoryReqValidate = (req) => {
    const updateCategorySchema = Joi.object({
        name: Joi.string()
    })
    return updateCategorySchema.validate(req);
}

module.exports = {
    CategoryReqValidate, UpdateCategoryReqValidate
};