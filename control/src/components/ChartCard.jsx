// src/components/ChartCard.jsx
import React from 'react';
import { Box, Paper, Typography, IconButton, Stack } from '@mui/material';
import { ArrowForwardIos, StarBorder, Star } from '@mui/icons-material';
import Chart from 'react-apexcharts';

export default function ChartCard({
  title,
  series,
  updatedAt,
  favorite = false,
  onToggleFavorite = () => {},
  onNavigate = () => {},
}) {
  const options = {
    chart: {
      type: 'bar',
      stacked: false,
      toolbar: { show: false },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '20%',
        borderRadius: 4,
        distributed: false,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: series[0].data.map((_, i) => `Item ${i + 1}`),
      labels: { style: { colors: '#4B4B60', fontSize: '12px' } },
    },
    yaxis: { show: false },
    grid: { show: false },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'left',
      markers: { radius: 12, width: 10, height: 10 },
      itemMargin: { horizontal: 16, vertical: 0 },
      labels: { colors: '#4B4B60', useSeriesColors: false },
    },
    fill: { opacity: 1 },
    colors: ['#0040FE', '#DEE0FF'],
    tooltip: { theme: 'light' },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        borderRadius: 2,
        p: 3,
        bgcolor: '#FBF8FF',
      }}
    >
      {/* título + navegação */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" color="text.primary">
          {title}
        </Typography>
        <IconButton
          size="small"
          onClick={onNavigate}
          sx={{
            bgcolor: '#0040FE',
            color: '#fff',
            '&:hover': { bgcolor: '#0030cc' },
          }}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      </Box>

      {/* gráfico */}
      <Box mb={2}>
        <Chart options={options} series={series} type="bar" height={500} width={680}/>
      </Box>

      

      {/* botão de favorito */}
      <IconButton
        size="small"
        onClick={onToggleFavorite}
        sx={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          color: favorite ? '#0040FE' : 'rgba(0,0,0,0.3)',
        }}
      >
        {favorite ? <Star /> : <StarBorder />}
      </IconButton>
    </Paper>
  );
}
