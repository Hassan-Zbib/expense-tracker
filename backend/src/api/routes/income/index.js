const express = require("express")
const router = express.Router()

const {
  getIncomes,
  setIncome,
  updateIncome,
  deleteIncome,
} = require("../../controllers/incomeController")

const { protect } = require("../../middlewares/authMiddleware")

// Routes on /api/incomes/
router.route("/")
        .post(protect, setIncome)
        .get(protect, getIncomes)

router.route("/:id")
        .delete(protect, deleteIncome)
        .put(protect, updateIncome)

module.exports = router
