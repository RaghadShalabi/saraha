import messageModel from "../../../../DB/message.model.js"
import userModel from "../../../../DB/user.model.js"

export const getMessages = async (req, res, next) => {
    const messagesList = await messageModel.find({ receiverId: req.user._id })
    return res.status(201).json({messagesList})
}

export const sendMessage = async (req, res, next) => {
    const { receiverId } = req.params
    const { message } = req.body
    const user = await userModel.findById({ _id: receiverId })
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    const createMessage = await messageModel.create({ receiverId, message })
    return res.status(201).json({ message: "message is received to user", createMessage });
}