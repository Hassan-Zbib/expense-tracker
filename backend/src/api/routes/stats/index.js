const express = require('express')
const router = express.Router()

const {
    getGeneral,
    getUserStats,
    getDiscoverUsers,
  } = require('../../controllers/statsController')

const { protect } = require('../../middlewares/authMiddleware')
  
// Routes on /api/stats/ 
router.get('/', getGeneral)
  
router.get('/me', protect,  getUserStats)
router.get('/discover', protect,  getDiscoverUsers)


module.exports = router