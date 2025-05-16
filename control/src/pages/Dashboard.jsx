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

// ─── Configuração do gráfico de barras ───────────────────────────
const barOptions = {
  chart: { type: 'bar', toolbar: { show: false }, background: 'transparent' },
  plotOptions: { bar: { horizontal: false, columnWidth: '60%', borderRadius: 4 } },
  xaxis: {
    categories: [
      'Jan','Fev','Mar','Abr','Mai','Jun',
      'Jul','Ago','Set','Out','Nov','Dez',
    ],
  },
  grid: { borderColor: '#e0e0e0' },
  dataLabels: { enabled: false },
  legend: { show: false },
};
const barSeries = [
  { name: 'Orçado',    data: [30,40,35,50,55,45,60,50,48,65,70,60] },
  { name: 'Realizado', data: [25,38,30,45,50,40,55,45,43,60,66,55] },
];

export default function Dashboard() {
  // ─── estados de filtro ───────────────────────────
  const [period,      setPeriod]      = useState('');
  const [year,        setYear]        = useState('');
  const [kpi,         setKpi]         = useState('');
  const [scenario,    setScenario]    = useState('');
  const [view,        setView]        = useState('realxorcado');

  // ─── listas internas ─────────────────────────────
  const views = [
    { value: 'realxorcado', label: 'Real X Orçado' },
    { value: 'forecast',    label: 'Forecast'     },
    { value: 'favoritos',   label: 'Favoritos'    },
  ];
  const periodOptions   = [
    { value: '',           label: 'Todos'           },
    { value: 'ultimos30',  label: 'Últimos 30 dias' },
    { value: 'mesAtual',   label: 'Mês atual'       },
  ];
  const yearOptions     = ['', '2023','2024','2025','2026'];
  const kpiOptions      = ['', 'MRR','ARR','Churn Rate','CAC','LTV'];
  const scenarioOptions = ['', 'Base','Otimista','Pessimista'];

  // ─── destaques no estado ─────────────────────────
  const [highlights, setHighlights] = useState([
    {
      id: 1,
      title: 'Lorem ipsum',
      value: 'R$ 000000,00',
      changePercent: '↑ 9%',
      updatedAt: 'Atualizado em 9 de maio',
      favorite: true,
    },
  ]);

  // ─── adiciona novo destaque ──────────────────────
  const handleAddHighlight = () => {
    const nextId = highlights.length
      ? Math.max(...highlights.map(h => h.id)) + 1
      : 1;
    setHighlights([
      ...highlights,
      {
        id: nextId,
        title: 'Novo destaque',
        value: 'R$ 000000,00',
        changePercent: '–',
        updatedAt: '—',
        favorite: false,
      }
    ]);
  };

  // ─── limpa todos filtros ─────────────────────────
  const handleClearAll = () => {
    setPeriod('');
    setYear('');
    setKpi('');
    setScenario('');
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <Sidebar selectedItem="Dashboard" onSelect={() => {}} />

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Container maxWidth={false} disableGutters>

          {/* Cabeçalho */}
          <TitleBar
            title="Dashboard"
            showDownloadButton
            downloadButtonText="Download"
            onDownload={() => {}}
          />

          {/* Filtros */}
          <Box mb={4}>
            <FiltersBar
              periodOptions={periodOptions}
              periodValue={period}
              onPeriodChange={e => setPeriod(e.target.value)}
              onPeriodClear={() => setPeriod('')}

              yearOptions={yearOptions}
              yearValue={year}
              onYearChange={e => setYear(e.target.value)}
              onYearClear={() => setYear('')}

              kpiOptions={kpiOptions}
              kpiValue={kpi}
              onKpiChange={e => setKpi(e.target.value)}
              onKpiClear={() => setKpi('')}

              scenarioOptions={scenarioOptions}
              scenarioValue={scenario}
              onScenarioChange={e => setScenario(e.target.value)}
              onScenarioClear={() => setScenario('')}

              viewOptions={views}
              viewValue={view}
              onViewChange={(_, v) => v && setView(v)}

              onClearAll={handleClearAll}
            />
          </Box>

          {/* Destaques */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {highlights.map(h => (
              <Grid item xs={6} md={3} key={h.id}>
                <InfoCard
                  title={h.title}
                  value={h.value}
                  changePercent={h.changePercent}
                  updatedAt={h.updatedAt}
                  favorite={h.favorite}
                  onToggleFavorite={() =>
                    setHighlights(highlights =>
                      highlights.map(item =>
                        item.id === h.id
                          ? { ...item, favorite: !item.favorite }
                          : item
                      )
                    )
                  }
                />
              </Grid>
            ))}

            <Grid item xs={6} md={3}>
              <Paper
                onClick={handleAddHighlight}
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

          {/* Gráfico de barras */}
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
