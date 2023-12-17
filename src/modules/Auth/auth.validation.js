import joi from "joi";

export const signUpSchema =
{
    body: joi.object({
        userName: joi.string().required().messages({
            'string.empty': "userName is required",
            'string.base': "userName must be string"
        }),
        email: joi.string().email().required().messages({
            'string.empty': "email is required",
            'string.email': "plz enter a valid email",
            'string.base': "email must be string"
        }),
        age: joi.number().integer().required().min(18).max(80).messages({
            'number.base': "age must be number",
            'number.integer': "age must be integer",
            'number.min': "age  be greater than or equal to 18",
            'number.max': "age must be less than or equal to 80"
        }),
        gender: joi.string().valid('Male', 'Female').messages({
            'any.only': "gender should be either Male or Female"
        }),
        password: joi.string().required().min(6).messages({
            'string.empty': "password is required",
            'string.min': "password length at least 6 characters long"
        }),
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
        email: joi.string().email().required().messages({
            'string.empty': "email is required",
            'string.email': "plz enter a valid email",
            'string.base': "email must be string"
        }),
        password: joi.string().required().min(6).messages({
            'string.empty': "password is required",
            'string.min': "password length at least 6 characters long"
        }),
    })
}