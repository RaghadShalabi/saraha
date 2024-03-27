import messageRouter from './Message/message.router.js'
import userRouter from './User/user.router.js'
import authRouter from './Auth/auth.router.js'
import connectDB from '../../DB/connection.js'
//import { sendEmail } from '../services/sendEmail.js'
import cors from 'cors'
import globalErrorHandler from '../middleware/errorHandling.js'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))


const initApp = (app, express) => {
    const fullPath = path.join(__dirname,'../uploads')

    connectDB()
    // sendEmail()
    app.use(cors())
    app.use('/uploads',express.static(fullPath))
    app.use(express.json())
    app.use('/message', messageRouter)
    app.use('/user', userRouter)
    app.use('/auth', authRouter)

    app.use(globalErrorHandler)

    app.use('/', (req, res) => {
        return res.status(201).json("Welcome...")
    })
    app.use('*', (req, res) => {
        return res.json({ message: "Page not found 404 x_x" })
    })
}
export default initApp

