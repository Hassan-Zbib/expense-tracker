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
            required: false,
            default: () => Date.now(),
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