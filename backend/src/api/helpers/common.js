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

module.exports = {
    generateToken,
    amountCustomSetter
}