const express = require('express')
const router = express.Router()

const {
    registerUser,
    loginUser,
    updateUser,
    resetPassword,
    getCurrentUser,
    requestResetPassword,
  } = require('../../controllers/userController')

const { protect } = require('../../middlewares/authMiddleware')
  
// Routes on /api/users/ 
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getCurrentUser)
router.post('/update', protect, updateUser)
router.post('/reset', resetPassword)
router.post('/request.reset', requestResetPassword)


module.exports = router