const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateToken } = require('../helpers/common')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

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