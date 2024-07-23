import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/Users.js'

const register = async (req, res) => {

    try {
        // destruct body
        const {
            username,
            firstName,
            lastName, 
            password,
            email, 
            birthDate,
            phone
        } = req.body

        // encode password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        // create new user
        const newUser = new User({
            username,
            firstName,
            lastName, 
            password: hashedPassword,
            email, 
            birthDate,
            phone
        })

        // save new user
        const savedUser = await newUser.save().lean()

        res.status(201).json({
            message: 'Registration successful',
            user: savedUser
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        // destruct body
        const {
            username, 
            password
        } = req.body

        // check if user exists
        const user = await User.findOne({username}).lean()

        if ( !user ) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)

        if ( !isMatch ) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        // return token-user
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY)
        
        delete user.password

        res.status(200).json({
            message: "Login sucessful",
            user,
            token
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export { register, login }