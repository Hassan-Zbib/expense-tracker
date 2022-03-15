const mongoose = require('mongoose')
const User = require('./userModel')

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
// .post('validate', func) has been validated (but not saved yet)   // this.toJSON()
incomeSchema.post('validate', test)

async function test(doc) {

    const user = await User.findById(`${doc.user._id}`).select('-password')
    console.log(doc.tempAmount)
    if (doc.tempAmount) {
        const diff = doc.amount - doc.tempAmount
        user.totalIncome += diff
    } else {
        user.totalIncome += doc.amount
        user.transactions += 1
    }

    user.save()
}

module.exports = mongoose.model('Income', incomeSchema)