const asyncHandler = require('express-async-handler')
const csvtojson = require('csvtojson')
const Income = require('../models/incomeModel')
const fs = require('fs');

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

    let incomes = []
    let total = 0

    // read uploaded csv
    let source = await csvtojson().fromFile(req.file.path)

    // validate each row and append values 
    source.forEach(row => {
        let record = {
            user: req.user.id,
            type: row.Type,
            amount: parseInt(row.Amount),
            date: row.Date
        }

        if(record.date) {
            let date = new Date(record.date)
            let isDate = date instanceof Date
            if(!isDate){
                res.status(400)
                throw new Error(`the record of type '${record.type}' and amount of '${record.amount}' does not have a valid date`)
            }
        }

        total += record.amount
        incomes.push(record)
    })

    // insert all records
    const imports = await Income.insertMany(incomes)
    
    // update user stats since middleware won't work on .insertMany
    req.user.transactions += imports.length
    req.user.totalIncome += total
    req.user.save()

    // delete the uploaded csv from the static folder
    fs.unlink(req.file.path, (err) => {
        if(err) {
            console.log(err)
        }
    })

    res.status(200).json({ file: req.file, incomes: imports })
    })

// @desc    Export incomes CSV
// @route   GET /api/incomes/export
// @access  Private
const exportIncome = asyncHandler(async (req, res) => {

})

module.exports = {
    getIncomes,
    setIncome,
    updateIncome,
    deleteIncome,
    importIncome,
    exportIncome,
  }