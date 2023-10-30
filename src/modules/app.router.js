import messageRouter from './Message/message.router.js'
import userRouter from './User/user.router.js'
import authRouter from './Auth/auth.router.js'
import connectDB from '../../DB/connection.js'
//import { sendEmail } from '../services/sendEmail.js'
import cors from 'cors'

const initApp = (app, express) => {
    connectDB()
    //sendEmail()
    app.use(cors())
    app.use(express.json())
    app.use('/message', messageRouter)
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
    app.use('*', (req, res) => {
        return res.json({ message: "Page not found 404 x_x" })
    })
}
export default initApp

