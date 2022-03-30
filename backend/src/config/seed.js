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

    // Create random users
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

    // Insert users
    let registeredUsers = await User.insertMany(users)
    console.log("Users added".bold.green)

    // Create transactions
    let incomes = []
    let expenses = []
    let usersUpdatedValues = []

    registeredUsers.forEach((user) => {
      let updatedValues = {
        id: user._id,
        transactions: transactionsPerUser * 2,
        totalIncome: 0,
        totalExpenses: 0,
      }

      for (let i = 0; i < transactionsPerUser; i++) {
        const newIncome = {
          user: user._id,
          type: faker.commerce.department(),
          amount: faker.commerce.price(10, 400, 0),
          date: faker.date.past(1),
        }
        const newExpense = {
          user: user._id,
          type: faker.commerce.department(),
          amount: faker.commerce.price(10, 400, 0),
          date: faker.date.past(1),
        }

        incomes.push(newIncome)
        updatedValues.totalIncome += parseInt(newIncome.amount)
        expenses.push(newExpense)
        updatedValues.totalExpenses += parseInt(newExpense.amount)
      }

      usersUpdatedValues.push(updatedValues)
    })

    // Insert transactions
    await Income.insertMany(incomes)
    await Expense.insertMany(expenses)
    console.log("Transactions added".bold.green)

    // Update users stats
    let savePromises = []

    registeredUsers = registeredUsers.map((user) => {
      let updatedUser = usersUpdatedValues.find(
        (values) => values.id === user._id
      )
      if (updatedUser) {
        user.transactions = updatedUser.transactions
        user.totalIncome = updatedUser.totalIncome
        user.totalExpenses = updatedUser.totalExpenses
      }
      return user
    })

    registeredUsers.forEach((updatedUser) => {
      savePromises.push(updatedUser.save())

      // User.findById(updatedUser.id).then(user => {
      //     user.transactions = updatedUser.transactions
      //     user.totalIncome = updatedUser.totalIncome
      //     user.totalExpenses = updatedUser.totalExpenses
      //     user.save()
      // })
    })

    // resolve all save promises
    await Promise.all(savePromises)

    console.log("Users stats updated".bold.green)

    console.log("DB seeded successfully".bold.green)
  } catch (error) {
    console.log(error)
  }
}

seedDB(10, 5, process.env.DB_SEED_USERS_PASS).then(() => {
  mongoose.connection.close(() => {
    console.log("Connection closed".underline.blue)
    process.exit(0)
  })
})
