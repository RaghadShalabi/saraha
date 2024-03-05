import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signUpSchema =
{
    body: joi.object({
        userName: joi.string().required().messages({
            'string.empty': "userName is required",
            'string.base': "userName must be string"
        }),
        email: generalFields.email,
        age: joi.number().integer().required().min(18).max(80).messages({
            'number.base': "age must be number",
            'number.integer': "age must be integer",
            'number.min': "age  be greater than or equal to 18",
            'number.max': "age must be less than or equal to 80"
        }),
        gender: joi.string().valid('Male', 'Female').messages({
            'any.only': "gender should be either Male or Female"
        }),
        password: generalFields.password,
        cPassword: joi.string().valid(joi.ref('password')).required().messages({
            'any.only': "confirm password and password not matched",
            'any.required': "Confirm Password is required"
        }),
    })
    ,
    query: joi.object({
        test: joi.boolean().required().messages({
            'any.only': "test parameter value can only be true/false",
            'boolean.base': "test must be boolean",
            'any.required':'test is required'
        }),
    })
}

export const signInSchema =
{
    body: joi.object({
        email: generalFields.email,
        password: generalFields.password,
    })
}