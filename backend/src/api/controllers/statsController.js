const asyncHandler = require("express-async-handler")
const Income = require("../models/incomeModel")
const Expense = require("../models/expenseModel")
const User = require("../models/userModel")

// @desc    Get general stats
// @route   GET /api/stats
// @access  Public
const getGeneral = asyncHandler(async (req, res) => {
  // get users with publicVisibility
  const users = await User.find(
    { "settings.publicVisibility": true },
    {
      _id: 1,
      orgName: 1,
      country: 1,
      city: 1,
      totalIncome: 1,
      totalExpenses: 1,
      logoURL: 1,
      createdAt: 1,
    }
  )

  let userIds = users.map((user) => {
    return user._id
  })

  // get expenses and incomes of above users
  const expenses = await Expense.find(
    { user: { $in: userIds } },
    { _id: 0, type: 1, amount: 1, date: 1 }
  )

  const incomes = await Income.find(
    { user: { $in: userIds } },
    { _id: 0, type: 1, amount: 1, date: 1 }
  )

  // sort users into most recent registered and highest income users
  const recentUsers = users
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    .slice(0, 5)

  const highIncomeUsers = users
    .sort((a, b) => {
      return b.totalIncome - a.totalIncome
    })
    .slice(0, 5)

  // get count and total stats
  let usersStats = await User.aggregate([
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$totalIncome" },
        totalExpenses: { $sum: "$totalExpenses" },
        count: { $count: {} }
      },
    },
  ])

  usersStats = usersStats[0]
  
    // construct res
    const resData = {
        usersCount: usersStats.count,
        totalIncome: usersStats.totalIncome,
        totalExpenses: usersStats.totalExpenses,
      users: {
        recent: recentUsers,
        highestIncome: highIncomeUsers,
      },
      incomes: incomes,
      expenses: expenses,
    }

  res.status(200).json(resData)
})

module.exports = {
  getGeneral,
}
