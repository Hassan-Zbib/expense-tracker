const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./api/middlewares/errorMiddleware')
const  connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// For Non JSON inputs
// app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api', require('./api/routes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))