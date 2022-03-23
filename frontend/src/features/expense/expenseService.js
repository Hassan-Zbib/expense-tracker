import axios from "axios"

const BASE_URL = "http://localhost:5000/api/expenses"

// Create new expense
const createExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(BASE_URL, expenseData, config)

  return response.data
}

// Get user expenses
const getExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(BASE_URL, config)

  return response.data
}

// Delete user expense
const deleteExpense = async (expenseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(BASE_URL + `/${expenseId}`, config)

  return response.data
}

// Update user expense
const updateExpense = async (expenseId, expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    BASE_URL + `/${expenseId}`,
    expenseData,
    config
  )

  return response.data
}

const goalService = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
}

export default goalService
