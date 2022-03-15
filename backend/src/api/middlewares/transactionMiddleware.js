const User = require('../models/userModel')

async function updateUserIncome(doc) {

    const user = await User.findById(doc.user._id).select('-password')

    if (doc.tempAmount) {
        const diff = doc.amount - doc.tempAmount
        user.totalIncome += diff
    } else {
        user.totalIncome += doc.amount
        user.transactions += 1
    }

    user.save()
}

async function truncateUserIncome(doc) {

    const user = await User.findById(doc.user._id).select('-password')

    user.transactions -= 1
    user.totalIncome -= doc.amount

    user.save()
}

module.exports = {
    updateUserIncome,
    truncateUserIncome
}