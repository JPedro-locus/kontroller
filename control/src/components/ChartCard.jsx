// src/components/ChartCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Chart from 'react-apexcharts';

export default function ChartCard({
  title,
  series,
  options,
  legend,            // opcional: [{ label, color }, ...]
  updatedAt,
  favorite,
  onToggleFavorite,
  chartHeight = 300, // altura padrão
  chartWidth  = '100%' // largura padrão
}) {
  return (
    <Card sx={{ width: '100%', borderRadius: 2, bgcolor: '#f5f5f5' }}>
      <CardContent>
        {/* Cabeçalho */}
        <Box display="flex" alignItems="center">
          <Typography variant="body2" fontWeight={500}>
            {title}
          </Typography>
          <InfoOutlinedIcon
            fontSize="small"
            sx={{ mx: 0.5, color: 'text.secondary' }}
          />
          <Box flexGrow={1} />
          <IconButton size="small">
            <LaunchIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Gráfico */}
        <Box sx={{ my: 2, width: '100%' }}>
          <Chart
            options={options}
            series={series}
            type={options.chart.type}
            height={chartHeight}
            width={chartWidth}
          />
        </Box>

        {/* Legenda (se houver) */}
        {legend && (
          <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
            {legend.map((item) => (
              <Box
                key={item.label}
                display="flex"
                alignItems="center"
                sx={{ mx: 1 }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: item.color,
                    borderRadius: 1,
                    mr: 0.5
                  }}
                />
                <Typography variant="caption">
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Rodapé */}
        <Box display="flex" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            {updatedAt}
          </Typography>
          <Box flexGrow={1} />
          <IconButton
            size="small"
            onClick={onToggleFavorite}
            sx={{ ml: 0.5 }}
          >
            {favorite
              ? <StarIcon fontSize="small" color="primary" />
              : <StarBorderIcon fontSize="small" />
            }
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
