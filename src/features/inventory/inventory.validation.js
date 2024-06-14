const Joi = require('joi');
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('../../utils/validators')

const UpdateInventoryReqValidate = (req) => {
    const updateInventoryReqSchema = Joi.object({
        productId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        field: Joi.string().required().valid('threshold', 'stock'),
        value: Joi.number().min(1)
    })
    return updateInventoryReqSchema.validate(req);
}

module.exports = {
    UpdateInventoryReqValidate
}