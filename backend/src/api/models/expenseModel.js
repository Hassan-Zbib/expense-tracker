const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        type: {
            type: String,
            required: [true, 'Please add a type'],
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount'],
            default : 0,
        },
        date: {
            type: Date,
            required: [true, 'Please add a date'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Expense', expenseSchema)