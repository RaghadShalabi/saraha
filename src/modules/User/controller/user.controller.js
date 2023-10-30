import userModel from "../../../../DB/user.model.js"

export const getUsers = (req, res) => {
    return res.json({ message: "users" })
}

export const profile = async (req, res,next) => {
    return res.json({ message: req.user })
}
