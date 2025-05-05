// src/App.jsx
import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashborad';

function App() {
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />

      {/* Header no topo */}
      <Header />

      {/* Corpo: sidebar + conteúdo */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Sidebar
          selectedItem={selected}
          onSelect={(item) => setSelected(item)}
        />

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}
        >
          {/* Espaço para alinhar com o Toolbar interno, se precisar */}
          <Toolbar />

          {selected === 'Dashboard' && <Dashboard />}
          {/* futuramente: selected === 'DRE' && <DREPage /> etc. */}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
