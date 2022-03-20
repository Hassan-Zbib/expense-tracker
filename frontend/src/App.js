import React from 'react';
import Home from './pages/Home'
import theme from './theme'
import { ThemeProvider } from '@mui/material/styles'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
    
  );
}

export default App;
