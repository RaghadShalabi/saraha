import express from 'express'
const app = express()
import * as messageController from "./controller/message.controller.js"
import { asyncHandler } from '../../middleware/errorHandling.js';
import { auth } from '../../middleware/auth.middleware.js';

app.get('/', auth, asyncHandler(messageController.getMessages))
app.post('/:receiverId', asyncHandler(messageController.sendMessage))

export default app;