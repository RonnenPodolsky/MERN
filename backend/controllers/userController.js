import bcrypt from 'bcryptjs'
import e from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('fill in name email and password!')
    }

    if (password.length < 6 || !email.includes('@')) {
        res.status(400)
        throw new Error('password over 6 chars and @ in mail!')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('user already exists!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name, email, password: hashedPassword
    })

    if (user) {
        const { id, name, email } = user;
        res.status(201).json({ _id: id, name, email, token: generateToken(id) })
    }
    else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

// @desc    Authenticate a user
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }
    else {
        res.status(400).json({ message: 'auth arror' })

    }
})

// @desc    get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({ user: req.user })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d',
    })
}

export { registerUser, loginUser, getMe }
