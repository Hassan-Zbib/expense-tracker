const mongoose = require('mongoose')

const documentSchema = mongoose.Schema(
    {
        model: {
            type: String,
            required: [true, 'Please specify a model'],
            enum: ['Expense', 'Income']
        },
        extendes:  {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'model',
        },
        notes: {
            type: String,
            required: false,
            default: ""
        },
        date: {
            type: Date,
            required: [true, 'Please add a date'],
        },
        document: {
            type: Object,
            // required: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Document', documentSchema)