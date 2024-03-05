import Router from 'express';
const router = Router();
import * as messageController from "./controller/message.controller.js";
import { asyncHandler } from '../../middleware/errorHandling.js';
import { auth } from '../../middleware/auth.middleware.js';

router.get('/', auth, asyncHandler(messageController.getMessages))
router.post('/:receiverId', asyncHandler(messageController.sendMessage))

export default router;
