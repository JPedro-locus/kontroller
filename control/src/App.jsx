// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';

import Header  from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

import Dashboard    from './pages/Dashboard';
import DRE          from './pages/DRE';
import DFC          from './pages/DFC';
import Budgets      from './pages/Budget';
import BudgetDetail from './pages/BudgetDetail';
import KPIs         from './pages/KPIS';
import CreateKPI    from './pages/CreateKPI';
import Login        from './pages/Login';

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // derive the sidebar’s selectedItem from the current path
  let selectedItem = 'Dashboard';
  if (location.pathname.startsWith('/dre'))        selectedItem = 'DRE';
  else if (location.pathname.startsWith('/dfc'))   selectedItem = 'DFC';
  else if (location.pathname.startsWith('/orcamentos')) selectedItem = 'Orçamentos';
  else if (location.pathname.startsWith('/kpis'))  selectedItem = 'KPIs';

  const handleSelect = (item) => {
    switch (item) {
      case 'Dashboard':   navigate('/dashboard'); break;
      case 'DRE':         navigate('/dre');       break;
      case 'DFC':         navigate('/dfc');       break;
      case 'Orçamentos':  navigate('/orcamentos');break;
      case 'KPIs':        navigate('/kpis');      break;
      default:            navigate('/dashboard');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
      <Sidebar selectedItem={selectedItem} onSelect={handleSelect} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          width: '100%',
          p: 0,
          m: 0,
        }}
      >
        <Toolbar disableGutters />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dre"       element={<DRE />} />
          <Route path="/dfc"       element={<DFC />} />
          <Route path="/orcamentos" element={<Budgets />} />
          <Route path="/orcamentos/:budgetId" element={<BudgetDetail />} />
          <Route path="/kpis"       element={<KPIs />} />
          <Route path="/kpis/novo"  element={<CreateKPI />} />
          {/* add other routes here as needed */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <Router>
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
        <MainLayout />
      </Box>
    </Router>
  );
}
