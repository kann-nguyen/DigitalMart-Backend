const Joi = require('joi');
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('../../utils/validators')

const createOrderReqValidate = (req) => {
    const createOrderSchema = Joi.object({
        items: Joi.array().min(1).items(Joi.object({
            product: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
            quantity: Joi.number().greater(0).required(),
            subTotalPrice: Joi.number().greater(0).required()
        }).required()),
        totalPrice: Joi.number().required().greater(0),
        cardName: Joi.string().required(),
        cardNumber: Joi.string().required(),
        cvv: Joi.string().required(),
        // expiration: Joi.string().pattern(new RegExp('^(0[1-9]|1[0-2])\/(19|20)\d{2}$')).required(),
        expiration: Joi.string().required()
    })
    return createOrderSchema.validate(req);
}

module.exports = {
    createOrderReqValidate
}