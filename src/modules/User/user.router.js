import Router from 'express'
const router = Router()
import * as userController from "./controller/user.controller.js"
import { auth } from '../../middleware/auth.middleware.js'
import { asyncHandler } from '../../middleware/errorHandling.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
import fileUploadCloudinary, { fileValidationCloudinary } from '../../services/cloudmulter.js'
import { validation } from '../../middleware/validation.js'
import * as validators from './user.validation.js'

router.get('/', userController.getUsers)
router.get('/profile', fileUpload(fileValidation.image, 'user/profile').single('image'), auth, validation(validators.profile), asyncHandler(userController.profile))
router.get('/profile', fileUpload(fileValidation.file).single('file'), auth, validation(validators.profile), asyncHandler(userController.profile))
router.get('/profileC', fileUploadCloudinary(fileValidationCloudinary.image).single('image'), auth, validation(validators.profile), asyncHandler(userController.profileC))
router.patch('/cover', fileUpload(fileValidation.image, 'user/cover').array('image', 5), auth, asyncHandler(userController.cover))
router.patch('/updatePassword', auth, validation(validators.updatePassword), asyncHandler(userController.updatePassword))
router.get('/:id/profile', validation(validators.shareProfile), asyncHandler(userController.shareProfile))
export default router;