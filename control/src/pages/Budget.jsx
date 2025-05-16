// src/pages/Budgets.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import { StarBorder, Star } from '@mui/icons-material';
import Sidebar from '../components/Sidebar/Sidebar';
import TitleBar from '../components/Subtitle';
import FiltersBar from '../components/FiltersBar';
import Chart from 'react-apexcharts';
import logoImg from '../images/pending.svg';

const stackedOptions = {
  chart: {
    type: 'bar',
    stacked: true,
    background: 'transparent',
    toolbar: { show: false },
  },
  plotOptions: {
    bar: { horizontal: false, columnWidth: '60%', borderRadius: 4 },
  },
  xaxis: {
    categories: ['1990', '2000', '2010', '2020'],
    labels: { style: { colors: '#000', fontSize: '14px' } },
  },
  dataLabels: { enabled: false },
  grid: { show: false },
  legend: {
    position: 'bottom',
    markers: { radius: 12, width: 10, height: 10 },
    itemMargin: { horizontal: 16 },
  },
  fill: { opacity: 1 },
  colors: ['rgba(0,64,254,0.3)', 'rgba(0,64,254,1)'], // Fiction / Non-fiction
};

const stackedSeries = [
  { name: 'Fiction', data: [40, 55, 60, 80] },
  { name: 'Non-fiction', data: [30, 45, 50, 70] },
];

export default function Budgets() {
  const navigate = useNavigate();
  const [history, setHistory]     = useState('Histórico');
  const [sort, setSort]           = useState('modificado');
  const [view, setView]           = useState('favoritos');
  const [favorites, setFavorites] = useState({}); 

  const toggleFav = id => {
    setFavorites(f => ({ ...f, [id]: !f[id] }));
  };

  const budgets = [
    {
      id: 1,
      title: 'Nome do orçamento',
      value: 'R$ 000000,00',
      updatedAt: 'Criado em 9 de maio',
      pending: true,
    },
    {
      id: 2,
      title: 'Nome do orçamento',
      value: 'R$ 000000,00',
      updatedAt: 'Criado em 9 de maio',
      pending: false,
    },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <Sidebar selectedItem="Orçamentos" onSelect={() => {}} />

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Container maxWidth={false} disableGutters sx={{ p: 3 }}>

          {/* título + criar */}
          <TitleBar
            title="Galeria de orçamentos"
            showHistoryToggle
            historyValue={history}
            onHistoryChange={(_, v) => v && setHistory(v)}
            showCreateButton
            createButtonText="Criar orçamento"
            onCreate={() => navigate('/orcamentos/novo')}
          />

          {/* filtros */}
          <Box mb={4}>
            <FiltersBar
              periodOptions={[
                { value: 'modificado', label: 'Modificado' },
                { value: 'criacao',    label: 'Criado'     },
              ]}
              periodValue={sort}
              onPeriodChange={e => setSort(e.target.value)}
              onPeriodClear={() => setSort('')}

              viewOptions={[{ value: 'favoritos', label: 'Favoritos' }]}
              viewValue={view}
              onViewChange={(_, v) => v && setView(v)}

              yearOptions={null}
              kpiOptions={null}
              scenarioOptions={null}

              onClearAll={() => { setSort(''); setView(''); }}
            />
          </Box>

          {/* grid de cards */}
          <Grid container spacing={2}>
            {budgets.map(b => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={b.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: '#F2F5FF',
                    position: 'relative',
                    minHeight: 240,
                    minWidth: 450
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {b.title}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {b.value}
                  </Typography>

                  {b.pending ? (
                    <Box
                      component="img"
                      src={logoImg}
                      alt="Aguardando atualizações"
                      sx={{ width: '100%', mb: 2 }}
                    />
                  ) : (
                    <Chart
                      options={stackedOptions}
                      series={stackedSeries}
                      type="bar"
                      height={425}
                      width="130%"
                    />
                  )}

                  <Typography variant="caption" color="text.secondary">
                    {b.updatedAt}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={() => toggleFav(b.id)}
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      color: favorites[b.id] ? '#0040FE' : 'rgba(0,0,0,0.3)',
                    }}
                  >
                    {favorites[b.id] ? <Star /> : <StarBorder />}
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
