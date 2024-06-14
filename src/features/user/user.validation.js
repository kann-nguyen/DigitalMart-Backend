const Joi = require('joi');

const loginRequestValidate = (loginReq) => {
    console.log(loginReq);
    const loginReqSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return loginReqSchema.validate(loginReq, { abortEarly: true });
}

const signupRequestValidate = (signupReq) => {
    const signupReqSchema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        // gender: Joi.string().required(),
        phonenumber: Joi.string().required().pattern(new RegExp('^0\\d{9,10}$'))
    })
    return signupReqSchema.validate(signupReq, { abortEarly: true });
}

const refreshTokenReqValidate = (req) => {
    const refreshTokenReqSchema = Joi.object({
        refreshToken: Joi.string().required()
    })
    return refreshTokenReqSchema.validate(req);
}

const updateUserInfoReqValidate = (req) => {
    const updateUserInfoReqSchema = Joi.object({
        username: Joi.string(),
        phonenumber: Joi.string().pattern(new RegExp('^0\\d{9,10}$')),
        gender: Joi.string().valid('MALE', 'FEMALE', 'CUSTOM')
    })
    return updateUserInfoReqSchema.validate(req);
}

const changePasswordReqValidate = (req) => {
    const changePasswordReqSchema = Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
        retypePassword: Joi.string().required()
    });
    return changePasswordReqSchema.validate(req);
}

const forgotPasswordReqValidate = (req) => {
    const forgotPasswordReqSchema = Joi.object({
        email: Joi.string().email().required()
    })
    return forgotPasswordReqSchema.validate(req);
}

module.exports = {
    loginRequestValidate,
    signupRequestValidate,
    refreshTokenReqValidate,
    updateUserInfoReqValidate,
    changePasswordReqValidate,
    forgotPasswordReqValidate
}