const express = require('express')
const router = express.Router()

// const {
//     registerUser,
//     loginUser,
//     getMe,
//   } = require('../controllers/userController')
//   const { protect } = require('../middleware/authMiddleware')
  
//   router.post('/', registerUser)
//   router.post('/login', loginUser)
//   router.get('/me', protect, getMe)

router.get('/', (req, res) => {
    res.json({message: "OK"})
})

module.exports = router