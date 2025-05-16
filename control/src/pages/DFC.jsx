// src/pages/DFC.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import TitleBar from '../components/Subtitle';
import FiltersBar from '../components/FiltersBar';
import PeriodPicker from '../components/PeriodPicker';
import DataTable from '../components/DataTable';

export default function DFC() {
  // filtros
  const [period, setPeriod]         = useState('');
  const [year, setYear]             = useState('');
  const [kpi, setKpi]               = useState('');
  const [view, setView]             = useState('realOrcado');
  const [scenario, setScenario]     = useState('');
  const [baseBudget, setBaseBudget] = useState('');

  // dados
  const months = [
    'Jan-22','Fev-22','Mar-22','Abr-22',
    'Mai-22','Jun-22','Jul-22','Ago-22',
  ];
  const rows = [
    { label: 'Recebimentos Operacionais', unit: 'R$', values: [120,130,125,140,150,145,160,170] },
    { label: 'Investimentos',             unit: 'R$', values: [-50,-60,-55,-70,-65,-60,-75,-80] },
    { label: 'Financiamentos',            unit: 'R$', values: [30,25,20,15,10,5,0,-5] },
  ];

  // Intercala Real / Forecast nas colunas
  const viewLabels = months.map((_, i) =>
    i % 2 === 0 ? 'Real' : 'Forecast'
  );

  // comparar períodos
  const [periods, setPeriods] = useState([
    { label: 'Período 1', start: '', end: '' },
    { label: 'Período 2', start: '', end: '' },
  ]);
  const handlePeriodConfirm = idx => ({ start, end }) => {
    setPeriods(p => {
      const c = [...p];
      c[idx] = { ...c[idx], start, end };
      return c;
    });
  };
  const handlePeriodCancel = idx => {
    setPeriods(p => {
      const c = [...p];
      c[idx] = { ...c[idx], start: '', end: '' };
      return c;
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <Sidebar selectedItem="DFC" onSelect={() => {}} />

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Container maxWidth={false} disableGutters>
          {/* cabeçalho */}
          <TitleBar
            title="DFC"
            showSelect
            selectLabel="Orçamento base"
            selectOptions={[
              { value: 'jan', label: 'Jan' },
              { value: 'fev', label: 'Fev' },
              { value: 'mar', label: 'Mar' },
            ]}
            selectValue={baseBudget}
            onSelectChange={e => setBaseBudget(e.target.value)}
            showDownloadButton
            downloadButtonText="Download"
            onDownload={() => {}}
          />

          {/* filtros */}
          <Box mb={3}>
            <FiltersBar
              periodOptions={[
                { value: 'ultimos30', label: 'Últimos 30 dias' },
                { value: 'mesAtual',  label: 'Mês atual' },
              ]}
              periodValue={period}
              onPeriodChange={e => setPeriod(e.target.value)}
              yearOptions={[2025,2024,2023,2022]}
              yearValue={year}
              onYearChange={e => setYear(e.target.value)}
              kpiOptions={['Recebimentos Operacionais','Investimentos','Financiamentos']}
              kpiValue={kpi}
              onKpiChange={e => setKpi(e.target.value)}
              viewOptions={[
                { value: 'realOrcado', label: 'Real X Orçado' },
                { value: 'forecast',    label: 'Forecast' },
                { value: 'favoritos',   label: 'Favoritos' },
              ]}
              viewValue={view}
              onViewChange={(_, v) => v && setView(v)}
              scenarioOptions={['Base','Otimista','Pessimista']}
              scenarioValue={scenario}
              onScenarioChange={e => setScenario(e.target.value)}
            />
          </Box>

          {/* tabela estilizada */}
          <DataTable rows={rows} months={months} viewLabels={viewLabels} />

          {/* comparar períodos */}
          <Typography variant="h6" gutterBottom>
            Comparar períodos
          </Typography>
          <Grid container spacing={2}>
            {periods.map((p,i) => (
              <Grid item xs={12} md={4} key={p.label}>
                <PeriodPicker
                  label={p.label}
                  onConfirm={handlePeriodConfirm(i)}
                  onCancel={() => handlePeriodCancel(i)}
                />
              </Grid>
            ))}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px dashed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 160,
                  minWidth: 280,
                }}
              >
                + Adicionar período
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
