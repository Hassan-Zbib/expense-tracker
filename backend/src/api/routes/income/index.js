const express = require('express')
const router = express.Router()

const {} = require('../../controllers/incomeController')

const { protect } = require('../../middlewares/authMiddleware')

// Routes on /api/incomes/ 


module.exports = router