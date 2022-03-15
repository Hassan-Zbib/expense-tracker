const express = require('express')
const router = express.Router()

const {
    getDocuments,
    setDocument,
    updateDocument,
    deleteDocument,
  } = require("../../controllers/documentController")

const { protect } = require("../../middlewares/authMiddleware")

// Routes on /api/documents/
router.post("/", protect, setDocument)

router.get("/:model/:id", protect, getDocuments)

router.route("/:id")
    .delete(protect, deleteDocument)
    .put(protect, updateDocument)

module.exports = router