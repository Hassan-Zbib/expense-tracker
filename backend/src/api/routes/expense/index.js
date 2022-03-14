const express = require('express')
const router = express.Router()

const {} = require('../../controllers/expenseController')

const { protect } = require('../../middlewares/authMiddleware')

// Routes on /api/expenses/ 


module.exports = router