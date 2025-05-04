// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Grid, Container } from '@mui/material';
import InfoCard from '../components/Infocard';
import ChartCard from '../components/ChartCard';

// ─── Configurações de exemplo dos gráficos ─────────────────────
// 1) Gráfico de barras
const barOptions = {
  chart: { type: 'bar' },
  plotOptions: {
    bar: { horizontal: false, columnWidth: '60%', borderRadius: 4 },
  },
  xaxis: {
    categories: [
      'Jan','Fev','Mar','Abr','Mai','Jun',
      'Jul','Ago','Set','Out','Nov','Dez'
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
    // 1) Container com largura livre (sem maxWidth)
    <Container maxWidth={false} disableGutters>
      {/* ─── PRIMEIRA LINHA: 4 CARDS INFORMATIVOS ──────────────── */}
      <Grid container spacing={2}>
        {[
          { key: 'saldo', title: 'Saldo no caixa',  value: 'R$ 000000,00' },
          { key: 'mrr',   title: 'MRR',              value: 'R$ 000000,00' },
          { key: 'churn', title: 'Churn rate',       value: '4,5%'      },
          { key: 'ebitda',title: 'EBITDA',           value: '18%'       },
        ].map(({ key, title, value }) => (
          // xs (boolean) faz cada item crescer igualmente
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

      {/* ─── SEGUNDA LINHA: 3 CARDS DE GRÁFICO ─────────────────── */}
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
              { label: 'Orçado',    color: '#000000' },
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
