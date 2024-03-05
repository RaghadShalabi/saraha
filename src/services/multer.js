import multer from "multer";
import { nanoid } from 'nanoid'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const fileValidation = {
    image: ['image/png', 'image/webp', 'image/jpeg'],
    file: ['application/pdf']
}
import fs from 'fs'
function fileUpload(customValidation = [], customPath = 'public') {
    const fullPath = path.join(__dirname, `../uploads/${customPath}`);

    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {//cb:callback
            cb(null, fullPath)
        },
        filename: (req, file, cb) => {
            const suffixName = nanoid() + "-" + file.originalname;
            file.dest = `uploads/${customPath}/${suffixName}`
            cb(null,suffixName)
        }
    })
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

export default fileUpload;
