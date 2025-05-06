// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import InfoCard from '../components/InfoCard';
import ChartCard from '../components/ChartCard';

// ─── Exemplos de configurações de gráfico ────────────────────────
// 1) Gráfico de barras
const barOptions = {
  chart: { type: 'bar' },
  plotOptions: {
    bar: { horizontal: false, columnWidth: '60%', borderRadius: 4 },
  },
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

// 2) Radial completo
const radialFullOptions = {
  chart: { type: 'radialBar' },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle:   135,
      hollow: { size: '60%' },
      dataLabels: {
        name: { show: false },
        value: { offsetY: 5, fontSize: '16px' },
      },
    },
  },
  colors: ['#000000','#FFFFFF','#757575'],
};
const radialFullSeries = [50, 30, 20];

// 3) Semicírculo
const radialSemiOptions = {
  chart: { type: 'radialBar' },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle:   90,
      hollow: { size: '60%' },
      dataLabels: {
        name: { show: false },
        value: { offsetY: 0, fontSize: '16px' },
      },
    },
  },
  colors: ['#555555','#f5f5f5'],
};
const radialSemiSeries = [60];

export default function Dashboard() {
  // filtros
  const [period,   setPeriod]   = useState('');
  const [month,    setMonth]    = useState('');
  const [year,     setYear]     = useState('');
  const [category, setCategory] = useState('');

  const handleReset = () => {
    setPeriod('');
    setMonth('');
    setYear('');
    setCategory('');
    // Aqui você também pode recarregar dados filtrados
  };

  // favoritos
  const [favorites, setFavorites] = useState({
    saldo: false,
    mrr:   true,
    churn: false,
    ebitda:false,
    bar:   false,
    full:  false,
    semi:  false,
  });
  const toggle = (key) =>
    setFavorites((f) => ({ ...f, [key]: !f[key] }));

  return (
    <Container maxWidth={false} disableGutters sx={{ p: 3 }}>
      {/* ─── BARRA DE FILTROS ─────────────────────────────────────── */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Button
          startIcon={<ClearIcon />}
          onClick={handleReset}
          sx={{
            backgroundColor: '#F8D3E1',
            color: '#000',
            '&:hover': { backgroundColor: '#F0C4D2' },
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            borderRadius: 2,
            px: 2.5,
          }}
        >
          Resetar filtros
        </Button>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Período</InputLabel>
          <Select
            value={period}
            label="Período"
            onChange={(e) => setPeriod(e.target.value)}
          >
            <MenuItem value=""><em>Todos</em></MenuItem>
            <MenuItem value="hoje">Hoje</MenuItem>
            <MenuItem value="semana">Essa semana</MenuItem>
            <MenuItem value="mes">Esse mês</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel>Mês</InputLabel>
          <Select
            value={month}
            label="Mês"
            onChange={(e) => setMonth(e.target.value)}
          >
            {['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'].map(m => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 80 }}>
          <InputLabel>Ano</InputLabel>
          <Select
            value={year}
            label="Ano"
            onChange={(e) => setYear(e.target.value)}
          >
            {[2025,2024,2023,2022].map(y => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={category}
            label="Categoria"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value=""><em>Todas</em></MenuItem>
            <MenuItem value="financeiro">Financeiro</MenuItem>
            <MenuItem value="operacional">Operacional</MenuItem>
            <MenuItem value="comercial">Comercial</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* ─── PRIMEIRA LINHA: CARDS INFORMATIVOS ───────────────────── */}
      <Grid container spacing={2}>
        {[
          { key: 'saldo',  title: 'Saldo no caixa', value: 'R$ 000000,00' },
          { key: 'mrr',    title: 'MRR',             value: 'R$ 000000,00' },
          { key: 'churn',  title: 'Churn rate',      value: '4,5%'       },
          { key: 'ebitda', title: 'EBITDA',          value: '18%'        },
        ].map(({ key, title, value }) => (
          <Grid item xs key={key}>
            <InfoCard
              title={title}
              value={value}
              changePercent="9% atualizado 9 de maio"
              favorite={favorites[key]}
              onToggleFavorite={() => toggle(key)}
            />
          </Grid>
        ))}
      </Grid>

      {/* ─── SEGUNDA LINHA: CARDS DE GRÁFICO ─────────────────────── */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Lorem ipsum"
            series={barSeries}
            options={{
              ...barOptions,
              chart: { ...barOptions.chart, height: 240 },
            }}
            legend={[
              { label: 'Orçado', color: '#000000' },
              { label: 'Realizado', color: '#757575' },
            ]}
            updatedAt="Atualizado 9 de maio"
            favorite={favorites.bar}
            onToggleFavorite={() => toggle('bar')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ChartCard
            title="Lorem ipsum"
            series={radialFullSeries}
            options={{
              ...radialFullOptions,
              chart: { ...radialFullOptions.chart, height: 200 },
            }}
            legend={[
              { label: 'Lorem ipsum', color: '#000000' },
              { label: 'Lorem ipsum', color: '#FFFFFF' },
              { label: 'Lorem ipsum', color: '#757575' },
            ]}
            updatedAt="Atualizado 9 de maio"
            favorite={favorites.full}
            onToggleFavorite={() => toggle('full')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ChartCard
            title="Lorem ipsum"
            series={radialSemiSeries}
            options={{
              ...radialSemiOptions,
              chart: { ...radialSemiOptions.chart, height: 200 },
            }}
            legend={null}
            updatedAt="Atualizado 9 de maio"
            favorite={favorites.semi}
            onToggleFavorite={() => toggle('semi')}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
