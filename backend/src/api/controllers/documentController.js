const asyncHandler = require('express-async-handler')
const Document = require('../models/documentModel')

// @desc    Get documents for a transaction
// @route   GET /api/documents/:model/:id
// @access  Private
const getDocuments = asyncHandler(async (req, res) => {
    const docs = await Document.find({ model: req.params.model, extends: req.params.id })
  
    res.status(200).json(docs)
  })
  
// @desc    Set document for a transaction
// @route   POST /api/documents
// @access  Private
const setDocument = asyncHandler(async (req, res) => {

const doc = await Document.create({
    model: req.body.model,
    notes: req.body.type,
    date: req.body.date,
})

res.status(200).json(expense)
})

// @desc    Update document
// @route   PUT /api/documents/:id
// @access  Private
const updateDocument = asyncHandler(async (req, res) => {
const doc = await Document.findById(req.params.id)

if (!doc) {
    res.status(400)
    throw new Error('Document not found')
}

doc.notes = req.body.notes
doc.date = req.body.date

const updatedDoc = await doc.save()

res.status(200).json(updatedDoc)
})

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = asyncHandler(async (req, res) => {
const doc = await Document.findById(req.params.id)

if (!doc) {
    res.status(400)
    throw new Error('Document not found')
}

await doc.remove()

res.status(200).json({ id: req.params.id })
})

module.exports = {
    getDocuments,
    setDocument,
    updateDocument,
    deleteDocument,
  }