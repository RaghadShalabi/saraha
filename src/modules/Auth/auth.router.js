import express from 'express'
const app = express()
import * as authController from "./controller/auth.controller.js"
import { asyncHandler } from '../../middleware/errorHandling.js'
import { validation } from '../../middleware/validation.js'
import { signInSchema, signUpSchema } from './auth.validation.js'

app.post('/signUp', validation(signUpSchema), asyncHandler(authController.signUp))
app.post('/signIn', validation(signInSchema), asyncHandler(authController.signIn))
app.put('/confirmEmail/:emailToken', asyncHandler(authController.confirmEmail))
app.put('/newConfirmEmail/:refreshToken', asyncHandler(authController.newConfirmEmail))

export default app;