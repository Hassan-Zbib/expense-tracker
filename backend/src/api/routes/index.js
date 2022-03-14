const express = require('express')
const router = express.Router()


// API Health Route
router.get('/', (req, res) => {
    res.status(201).send('up')
})

// API routes
router.use('/user', require('./user'))
// router.use('/expenses', require('./expenses'))
// router.use('/income', require('./income'))

module.exports = router