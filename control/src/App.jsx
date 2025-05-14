// src/App.jsx
import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import DRE from './pages/DRE';
import KPIs from './pages/KPIs'; // <- importe aqui
import Login from './pages/Login';
import CreateKPI from './pages/CreateKPI';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selected, setSelected]   = useState('Dashboard');
  const [reloadKey, setReloadKey] = useState(0);

  const handleSelect = (item) => {
    if (item === selected) {
      setReloadKey((k) => k + 1);
    } else {
      setSelected(item);
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setSelected('Dashboard'); 
  };

  const handleCreateKPI = () => setSelected('CreateKPI');
  const handleBackFromCreate = () => setSelected('KPIs');

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <CssBaseline />
      <Header />

      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Sidebar selectedItem={selected} onSelect={handleSelect} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            width: '100%',
            p: 0,
          }}
        >
          <Toolbar />

          {selected === 'Dashboard' && <Dashboard key={reloadKey} />}
          {selected === 'DRE'       && <DRE />}
          {selected === 'KPIs'       && <KPIs onCreate={handleCreateKPI} />}
          {selected === 'CreateKPI'  && <CreateKPI onBack={handleBackFromCreate} />}
          {/* adicione aqui outras páginas conforme precisar */}
          
        </Box>
      </Box>
    </Box>
  );
}
