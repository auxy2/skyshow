import Joi from "joi";

export const SignUpSchema = Joi.object({
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
    passConfirm: Joi.string().required()
})

export const verifyOtpSchema = Joi.object({
    otp: Joi.string().required()
});

export const signInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})