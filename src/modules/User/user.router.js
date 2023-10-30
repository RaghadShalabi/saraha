import express from 'express'
const app = express()
import * as userController from "./controller/user.controller.js"
import { auth } from '../../middleware/auth.middleware.js'
import { asyncHandler } from '../../middleware/errorHandling.js'

app.get('/', userController.getUsers)
app.get('/profile', auth, asyncHandler(userController.profile))

export default app;