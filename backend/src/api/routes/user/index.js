const express = require('express')
const router = express.Router()

const {
    registerUser,
    loginUser,
    updateUser,
    resetPassword,
    getCurrentUser,
  } = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')
  
// Routes on /api/User/ 
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getCurrentUser)
router.post('/update', protect, updateUser)
router.post('/reset', resetPassword)


module.exports = router