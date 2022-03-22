import axios from "axios"

const BASE_URL = "http://localhost:8000/api/"

// Register user
const register = async (userData) => {
  const res = await axios.post(AUTH_URL + "users", userData)

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data))
  }
  return res.data
}

// Login user
const login = async (userData) => {
  const res = await axios.post(AUTH_URL + "login", userData)

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data))
  }

  return res.data
}

// Update user
const update = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.post(USER_URL + "update", userData, config)

  return res.data
}

// Get user
const get = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(AUTH_URL + "user-profile", config)

  return res.data
}

// logout user
const logout = () => {
  localStorage.removeItem("user")
}

const authService = {
  register,
  logout,
  login,
  update,
  get,
}

export default authService
