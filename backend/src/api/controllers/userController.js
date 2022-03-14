const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateToken } = require('../helpers/common')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    const { orgName, firstName, lastName, email, password } = req.body

    if (!orgName || !firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
      }

    // Check if user exists
    const userExists = await User.exists({ $or: [{email: email}, {orgName: orgName}] })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        orgName: orgName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })

    // Send user info and token
    if (user) {
        res.status(201).json({
            orgName: user.orgName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken: generateToken(user._id)
        })
    }

})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    
})

// @desc    Update a user
// @route   POST /api/users/update
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    
})

// @desc    Reset a user password
// @route   POST /api/users/reset
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUser = asyncHandler(async (req, res) => {
    
})



module.exports = {
    registerUser,
    loginUser,
    updateUser,
    resetPassword,
    getUser
}