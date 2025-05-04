// src/components/InfoCard.jsx
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

export default function InfoCard({
  title,
  value,
  changePercent,
  updatedAt,
  favorite,
  onToggleFavorite
}) {
  return (
    <Card sx={{ borderRadius: 2, bgcolor: '#f5f5f5' }}>
      <CardContent>
        {/* Cabeçalho: título + ícone de info + ícone de abrir */}
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

        {/* Valor principal */}
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{ my: 1 }}
        >
          {value}
        </Typography>

        {/* Rodapé: variação % + data + estrela */}
        <Box display="flex" alignItems="center">
          {changePercent && (
            <Box display="flex" alignItems="center">
              <LaunchIcon
                sx={{
                  transform: 'rotate(45deg)',
                  color: 'success.main',
                  fontSize: 16
                }}
              />
              <Typography
                variant="caption"
                color="success.main"
                sx={{ ml: 0.5 }}
              >
                {changePercent}
              </Typography>
            </Box>
          )}
          <Box flexGrow={1} />
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {updatedAt}
          </Typography>
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
