const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        orgName: {
            type: String,
            required: [true, 'Please add an organization name'],
            unique: true,
        },
        firstName: {
            type: String,
            required: [true, 'Please add a first name'],
        },
        lastName: {
            type: String,
            required: [true, 'Please add a last name'],
        },
        email: {
            type: String,
            required: [true, 'Please add a email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)