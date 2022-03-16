const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateToken } = require('../helpers/common')
const validator = require("validator")

// @desc    Register new user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    const { orgName, firstName, lastName, email, password } = req.body

    if (!orgName || !firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
      }

    // Validate email and password
    if (!validator.isStrongPassword(password, [{
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      }]) ) {
        res.status(400)
        throw new Error('Password is not valid')
      }

      if (!validator.isEmail(email)) {
        res.status(400)
        throw new Error('Email is not valid')
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
        password: hashedPassword
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
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
      }

    // Check for user email
    const user = await User.findOne({ email })
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    // Check password and respond
    if ( await bcrypt.compare(password, user.password)  ) {
        res.status(201)
        .json({
            orgName: user.orgName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    
})

// @desc    Update a user
// @route   POST /api/user/update
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Under Development'})
})

// @desc    Reset a user password
// @route   POST /api/user/reset
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        res.status(400)
        throw new Error('Please add your email')
      }

    // Check for user email
    const user = await User.findOne({ email })
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    res.status(200).json({message: 'Under Development'})
})

// @desc    Get user data
// @route   GET /api/user/me
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})



module.exports = {
    registerUser,
    loginUser,
    updateUser,
    resetPassword,
    getCurrentUser,
}