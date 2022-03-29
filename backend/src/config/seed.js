const { faker } = require("@faker-js/faker")
const connectDB = require("./db")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

const seedDB = async () => {
  await connectDB()

  const randomName = faker.name.findName()
  const randomEmail = faker.internet.email()
  const randomPhoneNumber = faker.phone.phoneNumber()

  console.log(randomName, randomEmail, randomPhoneNumber)
}

seedDB().then(() => {
  mongoose.connection.close(() => {
    console.log("connection closed")
    process.exit(0)
  })
})
