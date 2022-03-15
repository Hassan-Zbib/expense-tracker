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
        .get(protect, getIncomes)
        .delete(protect, deleteIncome)

router.route("/:id")
        .post(protect, setIncome)
        .put(protect, updateIncome)

module.exports = router
