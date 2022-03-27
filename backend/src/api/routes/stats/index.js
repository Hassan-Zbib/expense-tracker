const express = require('express')
const router = express.Router()

const {
    getGeneral,
    getUserStats
  } = require('../../controllers/statsController')

const { protect } = require('../../middlewares/authMiddleware')
  
// Routes on /api/stats/ 
router.get('/', getGeneral)
  
router.get('/me', protect,  getUserStats)


module.exports = router