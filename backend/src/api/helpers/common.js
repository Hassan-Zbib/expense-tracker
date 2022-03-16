const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
}

// custom setters don't work with arrow functions
function amountCustomSetter(newValue) {
    if (this.amount) {
        this.tempAmount = this.amount
    }
    return newValue
}

const validateImport = (source, id) => {
    let data = []
    let totalAmount = 0

    source.forEach(row => {
        let record = {
            user: id,
            type: row.Type,
            amount: parseInt(row.Amount),
            date: row.Date
        }

        if(record.date) {
            let date = new Date(record.date)
            let isDate = date instanceof Date
            if(!isDate){
                res.status(400)
                throw new Error(`the record of type '${record.type}' and amount of '${record.amount}' does not have a valid date`)
            }
        }

        totalAmount += record.amount
        data.push(record)

    })

    return {
        data,
        totalAmount
    }
}

module.exports = {
    generateToken,
    amountCustomSetter,
    validateImport
}