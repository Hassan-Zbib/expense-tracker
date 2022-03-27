const express = require('express')
const router = express.Router()

const {
    getGeneral
  } = require('../../controllers/statsController')

const { protect } = require('../../middlewares/authMiddleware')
  
// Routes on /api/stats/ 
router.route('/')
  .get(getGeneral)
  



module.exports = router