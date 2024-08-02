import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String, 
        required: true 
    },
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    birthDate: {
        type: Date,
        required: true 
    },
    profilePic: {
        type: String,
        default: 'public/assets/default_pic.png',
    },
    phone: {
        type: String, 
        required: true
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema, 'users')

export default User