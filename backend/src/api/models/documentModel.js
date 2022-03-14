const mongoose = require('mongoose')

const documentSchema = mongoose.Schema(
    {
        notes: {
            type: String,
            required: false,
            default: ""
        },
        date: {
            type: Date,
            required: [true, 'Please add a date'],
        },
        document: Object
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Document', documentSchema)