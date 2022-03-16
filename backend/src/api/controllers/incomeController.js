const asyncHandler = require('express-async-handler')
const csvtojson = require('csvtojson')
const json2csv = require('json2csv').parse
const Income = require('../models/incomeModel')
const fs = require('fs');
const { validateImport } = require('../helpers/common')

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

    // read uploaded csv
    let source = await csvtojson().fromFile(req.file.path)

    // validate data and append values 
    let validated = validateImport(source, req.user.id)

    // insert all records
    const imports = await Income.insertMany(validated.data)
    
    // update user stats since middleware won't work on .insertMany
    req.user.transactions += imports.length
    req.user.totalIncome += validated.totalAmount
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
    const incomes = await Income.find({ user: req.user.id })

    // fields to export in csv
    const fields = ['type', 'amount', 'date', 'createdAt', 'updatedAt'];

    let csv
    try {
    // create csv
    csv = json2csv(incomes, { fields })
    } catch (err) {
    throw new Error('Something went wrong please try again or contact an administrator')
    }
    
    // save csv to static folder
    const dateTime = Date.now() 
    const filePath =  `./src/api/static/income-${dateTime}.csv`
    fs.writeFile(filePath, csv, err => {
    if (err) {
        throw new Error('Something went wrong please try again or contact an administrator');
    }
    else {

        // delete this file after 30 seconds
        setTimeout(function () {
        fs.unlinkSync(filePath, (err) => {
            if(err) {
                console.log(err)
            }
        }) 
        }, 30000)

        res.status(200).download(filePath)
    }
    })

})

module.exports = {
    getIncomes,
    setIncome,
    updateIncome,
    deleteIncome,
    importIncome,
    exportIncome,
  }