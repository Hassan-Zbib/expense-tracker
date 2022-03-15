const asyncHandler = require('express-async-handler')
const Income = require('../models/incomeModel')

// @desc    Get incomes
// @route   GET /api/incomes
// @access  Private
const getIncomes = asyncHandler(async (req, res) => {
    const incomes = await Income.find({ user: req.user.id })
  
    res.status(200).json(incomes)
  })
  
// @desc    Set income
// @route   POST /api/incomes
// @access  Private
const setIncome = asyncHandler(async (req, res) => {

const income = await Income.create({
    user: req.user.id,
    type: req.body.type,
    amount: req.body.amount,
    date: req.body.date,
})

res.status(200).json(income)
})

// @desc    Update income
// @route   PUT /api/incomes/:id
// @access  Private
const updateIncome = asyncHandler(async (req, res) => {
const income = await Income.findById(req.params.id)

if (!income) {
    res.status(400)
    throw new Error('Income not found')
}

// Make sure the logged in user matches the income user
if (income.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
}

income.type = req.body.type
income.amount = req.body.amount
income.date = req.body.date

const updatedIncome = await income.save()

res.status(200).json(updatedIncome)
})

// @desc    Delete income
// @route   DELETE /api/incomes/:id
// @access  Private
const deleteIncome = asyncHandler(async (req, res) => {
const income = await Income.findById(req.params.id)

if (!income) {
    res.status(400)
    throw new Error('Income not found')
}

// Make sure the logged in user matches the income user
if (income.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
}

await income.remove()

res.status(200).json({ id: req.params.id })
})

// @desc    Import incomes CSV
// @route   POST /api/incomes/import
// @access  Private
const importIncome = asyncHandler(async (req, res) => {

    res.status(200).json({ textFields: req.body, file: req.file })
    })

module.exports = {
    getIncomes,
    setIncome,
    updateIncome,
    deleteIncome,
    importIncome,
  }