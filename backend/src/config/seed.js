const { faker } = require("@faker-js/faker")
const bcrypt = require("bcryptjs")
const colors = require("colors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const connectDB = require("./db")
const Income = require("../api/models/incomeModel")
const Expense = require("../api/models/expenseModel")
const User = require("../api/models/userModel")

const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(pass, salt)
  return hashedPassword
}

const seedDB = async (usersCount, transactionsPerUser, password) => {
  await connectDB()

  try {
    // clean DB
    await User.deleteMany({})
    await Income.deleteMany({})
    await Expense.deleteMany({})
    console.log("DB Cleaned".underline.blue)

    // create random users
    const hashedPassword = await hashPassword(password)
    let users = []
    for (let i = 0; i < usersCount; i++) {
      const newUser = {
        orgName: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        websiteAddress: faker.internet.url(),
        country: faker.address.country(),
        city: faker.address.city(),
        phone: faker.phone.phoneNumber(),
        about: faker.lorem.lines(3),
        logoURL: faker.internet.avatar(),
      }
      users.push(newUser)
    }

    // insert users
    const registeredUsers = await User.insertMany(users)
    console.log("Users added".bold.green)

    // create transacttions
    let incomes = []
    let expenses = []
    registeredUsers.forEach((user) => {
      for (let i = 0; i < transactionsPerUser; i++) {
        let newIncome = {
          user: user._id,
          type: faker.commerce.department(),
          amount: faker.commerce.price(10, 400, 0),
          date: faker.date.past(1),
        }
        let newExpense = {
          user: user._id,
          type: faker.commerce.department(),
          amount: faker.commerce.price(10, 400, 0),
          date: faker.date.past(1),
        }

        incomes.push(newIncome)
        expenses.push(newExpense)
      }
    })

    // Insert transactions
    await Income.insertMany(incomes)
    await Expense.insertMany(expenses)
    console.log("Transactions added".bold.green)

    console.log("DB seeded successfully".bold.green)
  } catch (error) {
    console.log(error)
  }
}

seedDB(10, 5, "Fakepass@01").then(() => {
  mongoose.connection.close(() => {
    console.log("Connection closed".underline.blue)
    process.exit(0)
  })
})
