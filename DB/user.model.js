import { Schema, model } from "mongoose";
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        default: "Female",
        enum: ['Male', 'Female'],
    }
}, {
    timestamps: true,
});

const userModel = model('User', userSchema)

export default userModel

