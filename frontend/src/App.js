import React from 'react';
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import theme from './theme'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
      </Router>
    </ThemeProvider>
    
  );
}

export default App;
