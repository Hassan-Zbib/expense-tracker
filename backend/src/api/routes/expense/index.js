const express = require("express")
const router = express.Router()

const {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
} = require("../../controllers/expenseController")

const { protect } = require("../../middlewares/authMiddleware")

// Routes on /api/expenses/
router.route("/")
        .post(protect, setExpense)
        .get(protect, getExpenses)

router.route("/:id")
        .delete(protect, deleteExpense)
        .put(protect, updateExpense)

module.exports = router
