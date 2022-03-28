import axios from "axios"

const BASE_URL = "http://localhost:5000/api/stats"

// Get Public stats
const getPublic = async () => {

  const response = await axios.get(BASE_URL)

  return response.data
}

// Get user stats
const getUserStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(BASE_URL + `/me`, config)

  return response.data
}

const goalService = {
    getPublic,
    getUserStats,
}

export default goalService
