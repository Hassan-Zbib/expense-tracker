import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import theme from "./theme"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route index path="/" element={<Home />} />

          <Route element={<AuthLayout />}>
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
          </Route>

          {/* Private Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/Dashboard" element={<Dashboard />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
