const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const { errorHandler } = require('./api/middlewares/errorMiddleware')
const  connectDB = require('./config/db')

dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)})

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