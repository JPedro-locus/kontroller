// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';

import Header  from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

import Dashboard  from './pages/Dashboard';
import DRE        from './pages/DRE';
import DFC        from './pages/DFC';           // ← importe aqui
// import Orcamentos from './pages/Orcamentos';
// import Simulacao  from './pages/Simulacao';
// import Previsoes  from './pages/Previsoes';
// import GrupoContas from './pages/GrupoContas';

import KPIs      from './pages/KPIs';
import CreateKPI from './pages/CreateKPI';
import Login     from './pages/Login';

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

        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          <Sidebar />

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

            <Routes>
              {/* rota raiz redireciona para dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* suas páginas principais */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dre"       element={<DRE />} />
              <Route path="/dfc"       element={<DFC />} />           {/* ← rota DFC */}

              {/* se precisar descomente e importe */}
              {/* <Route path="/orcamentos" element={<Orcamentos />} /> */}
              {/* <Route path="/simulacao"  element={<Simulacao />} /> */}
              {/* <Route path="/previsoes"  element={<Previsoes />} /> */}
              {/* <Route path="/grupo-de-contas" element={<GrupoContas />} /> */}

              {/* KPIs e subrota de criação */}
              <Route path="/kpis"      element={<KPIs />} />
              <Route path="/kpis/novo" element={<CreateKPI />} />

              {/* qualquer outra rota cai aqui */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}
