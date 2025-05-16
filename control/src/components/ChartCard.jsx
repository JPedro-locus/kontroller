// src/components/ChartCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function ChartCard({
  title,
  options,
  series,
  legend,
  updatedAt,
  favorite,
  onToggleFavorite,
  chartWidth = '100%',
}) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        p: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Title */}
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>

      {/* Arrow icon at top-right */}
      <IconButton
        size="small"
        onClick={() => {/* expand/redirect logic here */}}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          bgcolor: theme.palette.primary.main,
          color: '#fff',
          '&:hover': { bgcolor: theme.palette.primary.dark },
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      {/* Chart */}
      <Box sx={{ overflowX: 'auto', mb: 2 }}>
        <Chart
          options={options}
          series={series}
          type={options.chart?.type || 'bar'}
          width={chartWidth}
        />
      </Box>

      {/* Legend */}
      <Box display="flex" alignItems="center" mb={1}>
        {legend.map(({ label, color }, i) => (
          <Box key={i} display="flex" alignItems="center" mr={2}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: color,
                mr: 1,
              }}
            />
            <Typography variant="caption">{label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Footer: updatedAt and favorite star */}
      <Box display="flex" alignItems="center">
        <Typography variant="caption" color="text.secondary">
          {updatedAt}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton size="small" onClick={onToggleFavorite}>
          {favorite
            ? <StarIcon fontSize="small" />
            : <StarBorderIcon fontSize="small" />
          }
        </IconButton>
      </Box>
    </Paper>
  );
}

ChartCard.propTypes = {
  /** Título do cartão */
  title: PropTypes.string.isRequired,
  /** Configurações do gráfico ApexCharts */
  options: PropTypes.object.isRequired,
  /** Série de dados para o gráfico */
  series: PropTypes.array.isRequired,
  /** Lista de legendas: [{ label, color }] */
  legend: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** Texto de atualização */
  updatedAt: PropTypes.string.isRequired,
  /** Favorito marcado */
  favorite: PropTypes.bool,
  /** Callback ao clicar no ícone de favorito */
  onToggleFavorite: PropTypes.func,
  /** Largura do chart (pode ser '100%', '200%', etc.) */
  chartWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ChartCard.defaultProps = {
  favorite: false,
  onToggleFavorite: () => {},
  chartWidth: '100%',
};
