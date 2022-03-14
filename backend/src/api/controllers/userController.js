const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateToken } = require('../helpers/common')

const registerUser = asyncHandler(async (req, res) => {

})

const loginUser = asyncHandler(async (req, res) => {
    
})

const updateUser = asyncHandler(async (req, res) => {
    
})

const resetPassword = asyncHandler(async (req, res) => {
    
})

const getUser = asyncHandler(async (req, res) => {
    
})



module.exports = {
    registerUser,
    loginUser,
    updateUser,
    resetPassword,
    getUser
}