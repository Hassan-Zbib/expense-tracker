import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/incomes"

// Create new income
const createIncome = async (incomeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(BASE_URL, incomeData, config)

  return response.data
}

// Get user incomes
const getIncomes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(BASE_URL, config)

  return response.data
}

// Delete user income
const deleteIncome = async (incomeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(BASE_URL + `/${incomeId}`, config)

  return response.data
}

// Update user income
const updateIncome = async (incomeId, incomeData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    
      const response = await axios.put(BASE_URL + `/${incomeId}`, incomeData, config)
    
      return response.data
}

const goalService = {
    createIncome,
    getIncomes,
    deleteIncome,
    updateIncome,
}

export default goalService
