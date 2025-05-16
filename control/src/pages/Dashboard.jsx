// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import TitleBar from '../components/Subtitle';
import FiltersBar from '../components/FiltersBar';
import InfoCard from '../components/InfoCard';
import ChartCard from '../components/ChartCard';
import PeriodPicker from '../components/PeriodPicker';

// ─── Configuração do gráfico de barras ───────────────────────────
const barOptions = {
  chart: { type: 'bar' },
  plotOptions: { bar: { horizontal: false, columnWidth: '60%', borderRadius: 4 } },
  xaxis: {
    categories: [
      'Jan','Fev','Mar','Abr','Mai','Jun',
      'Jul','Ago','Set','Out','Nov','Dez',
    ],
  },
  grid: { borderColor: '#e0e0e0' },
  dataLabels: { enabled: false },
};
const barSeries = [
  { name: 'Orçado',    data: [30,40,35,50,55,45,60,50,48,65,70,60] },
  { name: 'Realizado', data: [25,38,30,45,50,40,55,45,43,60,66,55] },
];

export default function Dashboard() {
  // ─── estados de filtro ───────────────────────────
  const [period,    setPeriod]    = useState('');
  const [year,      setYear]      = useState('');
  const [kpi,       setKpi]       = useState('');
  const [view,      setView]      = useState('realxorcado');
  const [baseBudget,setBaseBudget]= useState('');

  // ─── “Pills” de visão ───────────────────────────
  const views = [
    { key: 'realxorcado', label: 'Real X Orçado' },
    { key: 'forecast',    label: 'Forecast' },
    { key: 'favoritos',   label: 'Favoritos' },
  ];

  // ─── Dropdowns ───────────────────────────
  const periodOptions = [
    { value: 'ultimos30', label: 'Últimos 30 dias' },
    { value: 'mesAtual',  label: 'Mês atual' },
  ];
  const yearOptions = ['2023','2024','2025','2026'];
  const kpiOptions  = ['MRR','ARR','Churn Rate','CAC','LTV'];

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <Sidebar selectedItem="Dashboard" onSelect={() => {}} />

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Container maxWidth={false} disableGutters>

          {/* ─── Cabeçalho: Título + Select Orçamento + Download ───────────────────────────────────── */}
          <TitleBar
            title="Dashboard"
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

          {/* ─── Filtros: Período, Ano, KPI, Pills ───────────────────────────────────────────────────── */}
          <Box mb={4}>
            <FiltersBar
              periodOptions={periodOptions}
              periodValue={period}
              onPeriodChange={e => setPeriod(e.target.value)}

              yearOptions={yearOptions}
              yearValue={year}
              onYearChange={e => setYear(e.target.value)}

              kpiOptions={kpiOptions}
              kpiValue={kpi}
              onKpiChange={e => setKpi(e.target.value)}

              viewOptions={views}
              viewValue={view}
              onViewChange={(_, v) => v && setView(v)}

              scenarioOptions={[]}        // não usado aqui
              scenarioValue=""
              onScenarioChange={() => {}}
            />
          </Box>

          {/* ─── Destaques ───────────────────────────────────────────────────────────────────────────── */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={6} md={3}>
              <InfoCard
                title="Lorem ipsum"
                value="R$ 000000,00"
                changePercent="↑ 9%"
                updatedAt="Atualizado em 9 de maio"
                favorite
                onToggleFavorite={() => {}}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper
                onClick={() => {}}
                sx={{
                  height: '100%',
                  p: 2,
                  border: '2px dashed rgba(0,0,0,0.2)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.secondary',
                  cursor: 'pointer',
                }}
              >
                + Adicionar destaque
              </Paper>
            </Grid>
          </Grid>

          {/* ─── Gráfico de barras ──────────────────────────────────────────────────────────────────── */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ChartCard
                title="Lorem ipsum"
                options={barOptions}
                series={barSeries}
                legend={[
                  { label: 'Orçado',    color: '#000' },
                  { label: 'Realizado', color: '#757575' },
                ]}
                updatedAt="Atualizado em 9 de maio"
                favorite={false}
                onToggleFavorite={() => {}}
                chartWidth="200%"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
