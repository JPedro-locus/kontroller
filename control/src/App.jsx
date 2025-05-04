// src/App.jsx
import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Menu lateral */}
      <Sidebar />

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        {/* Esse Toolbar “empurra” o seu conteúdo abaixo da AppBar (se você tiver) */}
        <Toolbar />

        <h1>Bem-vindo ao seu dashboard</h1>
        {/* demais componentes / rotas */}
      </Box>
    </Box>
  );
}

export default App;
