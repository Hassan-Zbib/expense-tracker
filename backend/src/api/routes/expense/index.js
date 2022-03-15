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
        .get(protect, getExpenses)
        .delete(protect, deleteExpense)

router.route("/:id")
        .post(protect, setExpense)
        .put(protect, updateExpense)

module.exports = router
