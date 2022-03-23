const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const crypto = require("crypto")
const { generateToken } = require('../helpers/common')
const validator = require("validator")
const sendEmail = require('../helpers/sendEmail')

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
// @route   PUT /api/user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
}

  // validate and update inputs
  user.firstName = firstName ? firstName : user.firstName
  user.lastName = lastName ? lastName : user.lastName
  user.email = validator.isEmail(email) ? email : user.email
  user.websiteAddress = validator.isURL(websiteAddress) ? websiteAddress : user.websiteAddress
  user.country = country ? country : user.country
  user.city = city ? city : user.city
  user.phone = validator.isMobilePhone(phone) ? phone : user.phone
  user.about = about ? about : user.about
  user.logoURL = logoURL // needs updating with s3 link
  user.settings = {
    emailExports: settings.emailExports ? settings.emailExports : user.settings.emailExports,
    publicVisibility : settings.publicVisibility ? settings.publicVisibility : user.settings.publicVisibility,
  }


    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
})

// @desc    Reset a user password
// @route   POST /api/user/reset
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
    const { userId, token, password } = req.body

    if (!userId || !token || !password) {
        res.status(400)
        throw new Error('Please add all fields')
      }

    // Check token
    let passwordResetToken = await Token.findOne({ userId })
    if (!passwordResetToken) {
        res.status(400)
        throw new Error("Invalid or expired password reset token")
      }
    
    const isValid = await bcrypt.compare(token, passwordResetToken.token)
    if (!isValid) {
        res.status(400)
        throw new Error("Invalid or expired password reset token")
      }
    
    // Validate password
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

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Check for user and update 
    const user = await User.findById({ _id: userId })
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    user.password = hashedPassword
    user.save()

    // Send success email
    const userName = `${user.firstName} ${user.lastName}`
    sendEmail(
        user.email,
        "Password reset successfully",
        {
          name: userName,
        },
        "src/api/helpers/templates/resetPassword.handlebars"
      )

    await passwordResetToken.deleteOne();

    res.status(201).json({message: 'Password reset successfully'})
})

// @desc    Request a reset user password
// @route   POST /api/user/request.reset
// @access  Public
const requestResetPassword = asyncHandler(async (req, res) => {
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

    // check for token and delete if exists
    let token = await Token.findOne({ userId: user._id })
    if (token) { 
          await token.deleteOne()
    }

    // create new token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(resetToken, salt)

    // save token
    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
      }).save()

    // send email with the reset link
    const link = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&id=${user._id}`
    const userName = `${user.firstName} ${user.lastName}`
    sendEmail(user.email,"Password Reset Request",{name: userName,link: link,},"src/api/helpers/templates/resetPassword.handlebars")

    res.status(200).json({ message: 'Email Sent'})
})

// @desc    Get user data
// @route   GET /api/user
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
    requestResetPassword,
}