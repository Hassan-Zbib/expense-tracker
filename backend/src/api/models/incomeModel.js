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
            required: [true, 'Please add a date'],
        },
    },
    {
        timestamps: true,
    }
)

// Custom amount setter
incomeSchema.path('amount').set(( newValue ) => {
    if (this.amount) {
        this.tempAmount = this.amount
    }
    this.amount = newValue
});
// Middlewares/Hooks to update the users general stats
// .post('validate', func) has been validated (but not saved yet)   // this.toJSON()
incomeSchema.post('validate',  doc  => {
    
    if (doc.tempAmount) {
        const user = User.findById( doc.user )
        const diff = doc.amount - doc.tempAmount
        user.totalIncome += diff
        user.save()
    }

})

module.exports = mongoose.model('Income', incomeSchema)