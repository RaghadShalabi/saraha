import multer from "multer";

export const fileValidationCloudinary = {
    image:['image/png','image/webp','image/jpeg'],
    file:['application/pdf']
}

function fileUploadCloudinary(customValidation = []) {
    const storage = multer.diskStorage({})
    const fileFilter = (req, file, cb) => {
        // if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/webp") {
        // if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb("invalid format", false)
        }
    }
    const upload = multer({ fileFilter, storage })
    return upload;
}

export default fileUploadCloudinary;
