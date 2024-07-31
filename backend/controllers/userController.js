import User from "../models/Users.js"
import bcrypt from 'bcryptjs'

const changeUserInfo = async (req, res) => {
    try {
        const userID = req.user.id
        const { updates } = req.body

        if (req.file) {
            const imagePath = req.file.path.replace('public/', '')
            updates.profilePic = imagePath
        }
        
        const updatedUser = await User.findOneAndUpdate(
            {_id: userID},
            { $set: updates },
            { new: true, runValidators: true }
        ).lean()

        delete updatedUser.password

        res.status(200).json({
            message: "User info updated successfully",
            user: updatedUser
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const changePassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body
    const userID = req.user.id

    try {
        const user = await User.findById(userID)

        const passwordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ 
                error: 'Invalid password'
            })
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword

        await user.save()

        res.status(200).json({
            message: 'Password changed successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    const {password} = req.query
    const userID = req.user.id

    try {
        const user = await User.findById(userID)

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ 
                error: 'Invalid password'
            })
        }

        await User.deleteOne({_id: userID})

        res.status(200).json({
            message: 'User deleted successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export { changeUserInfo, changePassword, deleteUser }