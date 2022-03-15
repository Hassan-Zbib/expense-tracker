const mongoose = require('mongoose')
const { updateUserIncome }  = require('../middlewares/transactionMiddleware')
// const {  } = require('../helpers/common')

const incomeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            immutable: true,
        },
        type: {
            type: String,
            required: [true, 'Please add a type'],
            lowercase: true,
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount'],
            min: 1,
        },
        date: {
            type: Date,
            default: () => Date.now(),
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

// Custom amount setter (doesn't work with arrow func)
incomeSchema.path('amount').set(function( newValue )  {

    if (this.amount) {
        this.tempAmount = this.amount
    }
    return newValue
});

// Middlewares/Hooks to update the users general stats
// .post('validate', func) has been validated (but not saved yet)
incomeSchema.post('validate', updateUserIncome)


module.exports = mongoose.model('Income', incomeSchema)