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
        .delete(protect, deleteExpense)

router.route("/:id")
        .get(protect, getExpenses)
        .put(protect, updateExpense)

module.exports = router
