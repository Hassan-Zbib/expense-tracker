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
const { route } = require('../stats')
  
// Routes on /api/users/ 
router.route('/')
  .post(registerUser)
  .put(protect, updateUser)
  .get(protect, getCurrentUser)

router.post('/login', loginUser)
router.post('/reset', resetPassword)
router.post('/request.reset', requestResetPassword)


module.exports = router