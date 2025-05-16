// src/pages/BudgetDetail.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import Sidebar from '../components/Sidebar/Sidebar';
import FiltersBar from '../components/FiltersBar';
import DataTable from '../components/DataTable';

export default function BudgetDetail() {
  const navigate = useNavigate();
  const { budgetId } = useParams(); // assume route /budgets/:budgetId
  // you could fetch the budget name by ID; here we'll mock
  const budgetName = 'Nome do orçamento';

  // --- filters state ---
  const [period, setPeriod]     = useState('');
  const [year, setYear]         = useState('');
  const [kpi, setKpi]           = useState('');
  const [view, setView]         = useState('realOrcado');
  const [scenario, setScenario] = useState('');

  // --- table data (mock) ---
  const months     = ['Jan-22','Fev-22','Mar-22','Abr-22','Mai-22','Jun-22','Jul-22','Ago-22'];
  const viewLabels = months.map((_, i) => i % 2 === 0 ? 'Real' : 'Forecast');
  const metricNames = ['Lorem ipsum','Dolor sit','Amet','Consectetur','Adipiscing'];
  const rows = metricNames.map((label, ri) => ({
    label,
    unit: ri === 1 ? "Unit" : "R$'000'",
    values: months.map(() => '0000'),
  }));

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <Sidebar selectedItem="Orçamentos" onSelect={() => {}} />

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Container maxWidth={false} disableGutters sx={{ pt: 3, px: 3 }}>

          {/* ─── Header: Back + Title + Actions ───────────────────────── */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <Typography variant="h4" component="h1" sx={{ ml: 1 }}>
                {budgetName}
              </Typography>
            </Box>
            <Box>
              <Button
                startIcon={<ListIcon />}
                variant="outlined"
                sx={{ mr: 1, textTransform: 'none', borderRadius: '20px' }}
                onClick={() => navigate(`/budgets/${budgetId}/premissas`)}
              >
                Lista de premissas
              </Button>
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                sx={{ textTransform: 'none', borderRadius: '20px' }}
                onClick={() => navigate(`/budgets/${budgetId}/editar`)}
              >
                Editar dados
              </Button>
            </Box>
          </Box>

          {/* ─── Histórico toggle + filtros ───────────────────────────── */}
          <Box mb={4}>
            <FiltersBar
              periodOptions={[
                { value: 'ultimo',  label: 'Período' },
                { value: 'historico', label: 'Histórico' },
              ]}
              periodValue={period}
              onPeriodChange={e => setPeriod(e.target.value)}
              onPeriodClear={() => setPeriod('')}

              yearOptions={[2025,2024,2023,2022]}
              yearValue={year}
              onYearChange={e => setYear(e.target.value)}
              onYearClear={() => setYear('')}

              kpiOptions={['KPI','Chave','Secundário']}
              kpiValue={kpi}
              onKpiChange={e => setKpi(e.target.value)}
              onKpiClear={() => setKpi('')}

              scenarioOptions={['Base','Otimista','Pessimista']}
              scenarioValue={scenario}
              onScenarioChange={e => setScenario(e.target.value)}
              onScenarioClear={() => setScenario('')}

              viewOptions={[
                { value: 'realOrcado', label: 'Real X Orçado' },
                { value: 'forecast',    label: 'Forecast'      },
                { value: 'favoritos',   label: 'Favoritos'     },
              ]}
              viewValue={view}
              onViewChange={(_, v) => v && setView(v)}

              onClearAll={() => {
                setPeriod('');
                setYear('');
                setKpi('');
                setScenario('');
              }}
            />
          </Box>

          {/* ─── Data table ───────────────────────────────────────────── */}
          <DataTable rows={rows} months={months} viewLabels={viewLabels} />

        </Container>
      </Box>
    </Box>
  );
}
