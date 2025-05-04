// src/App.jsx
import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashborad';

function App() {
  // define qual item do menu está ativo
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Menu lateral */}
      <Sidebar
      
        selectedItem={selected}
        onSelect={(item) => setSelected(item)}
      />

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        {/* Espaço para AppBar (se você tiver uma) */}
        <Toolbar />

        {/* Aqui você renderiza o Dashboard ou outra “page” conforme o selected */}
        {selected === 'Dashboard' && <Dashboard />}

        {/* Exemplo de placeholders para futuras telas:
            {selected === 'DRE'        && <DREPage />}
            {selected === 'Simulação' && <SimulacaoPage />}
            etc.
        */}
      </Box>
    </Box>
  );
}

export default App;
