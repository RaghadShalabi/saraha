import userModel from "../../../../DB/user.model.js"
import cloudinary from "../../../services/cloudinary.js"
import { asyncHandler } from "../../../middleware/errorHandling.js"
import fs from 'fs';
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

export const getUsers = (req, res) => {
    return res.json({ message: "users" })
}

export const profile = async (req, res, next) => {
    if (!req.file) {
        return next(new Error("Please provide a file"));
    }
    const imageURL = `${req.file.dest}`;
    const path = req.file.path;
    //const imageURL = req.file.destination + "/" + req.file.filename;
    const user = await userModel.findByIdAndUpdate(req.user._id, { profilePic: { imageURL, path } }, { new: false })

    const oldFilePath = user.profilePic.path;

    if (user.profilePic) {
        fs.unlinkSync(oldFilePath);
    }
    return res.json({ message: user })
}

export const profileC = async (req, res, next) => {
    if (!req.file) {
        return next(new Error("Please provide a file"));
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/user/${req.user._id}/profile`
    })
    //return res.json(req.file.path)
    //return res.json(secure_URL)

    const user = await userModel.findByIdAndUpdate(req.user._id, { profilePicCloudinary: { secure_url, public_id } }, { new: false })

    if (user.profilePicCloudinary) {
        await cloudinary.uploader.destroy(user.profilePicCloudinary.public_id);
    }
    return res.json({ message: user })
}

export const cover = async (req, res, next) => {
    if (!req.files) {
        return next(new Error("Please provide a files"));
    }
    const coverPicURL = [];
    const coverPicPath = [];
    for (const file of req.files) {
        coverPicURL.push(`${file.dest}`)
        coverPicPath.push(`${file.path}`)
    }
    const user = await userModel.findByIdAndUpdate(req.user._id, { coverPic: { coverPicURL, coverPicPath } }, { new: false })
    // const oldFilePaths = [];
    // for (const pic of user.coverPic) {
    //     oldFilePaths.push(`${pic.coverPicPath}`);
    // }

    // if (user.coverPic) {
    //     fs.unlinkSync(user.coverPic.coverPicPath);
    // }

    // for (const oldFilePath of oldFilePaths) {
    //     if (fs.existsSync(`${oldFilePath}`)) {
    //         fs.unlinkSync(`${oldFilePath}`);
    //     }
    // }

    // if (user.coverPic && user.coverPic.coverPicPath && user.coverPic.coverPicPath.length > 0) {
    //     for (const oldFilePath of user.coverPic.coverPicPath) {
    //             fs.unlinkSync(`${oldFilePath}`);
    //     }
    // }
    return res.status(201).json({ message: "Successfully uploaded coverPic", user })
}

export const coverCloudinary = async (req, res, next) => {
    if (!req.files) {
        return next(new Error("Please provide a files"));
    }
    const coverPic = []
    for (const file of req.files) {
        coverPic.push(`${file.dest}`)
    }
    const user = await userModel.findByIdAndUpdate(req.user._id, { coverPic }, { new: true })

    return res.status(201).json({ message: "Successfully uploaded coverPic", user })
}

// Function to encrypt data
function encrypt(text, key) {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Function to decrypt data
function decrypt(encryptedText, key) {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export const updatePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user._id);

    const match = bcrypt.compareSync(oldPassword, user.password);
    if (!match) {
        return next(new Error('invalid old password'))
    }

    // const matchOldNew = bcrypt.compareSync(newPassword, user.password); 
    // if(matchOldNew){
    //     return next(new Error("New password must be different with the Old Password"))
    // }

    // Generate a key for encryption (you should store this securely)
    const encryptionKey = 'your_encryption_key_here';

    // Encrypt the new password
    const encryptedNewPassword = encrypt(newPassword, encryptionKey);

    const hashNewPassword = bcrypt.hashSync(newPassword, parseInt(process.env.SALT_ROUND));
    await userModel.updateOne({ _id: req.user._id }, { password: hashNewPassword })
    // user.password = hashNewPassword;
    // user.save();

    // Decrypt the password for logging (optional)
    const decryptedPassword = decrypt(encryptedNewPassword, encryptionKey);
    console.log('Decrypted Password:', decryptedPassword);
    return res.json(user)
}

export const shareProfile = async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findById(id).select("userName email")
    if (!user) {
        return next(new Error("User not found"));
    }
    return res.status(200).json({ message: "success", user })
}