// src/components/InfoCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function InfoCard({ title, value, change, updatedAt }) {
  return (
    <Card
      sx={{
        bgcolor: '#DEE0FF',
        borderRadius: 2,
        boxShadow: 'none',
        width: 360
      }}
    >
      <CardHeader
        title={
          <Typography variant="subtitle2" sx={{ fontWeight: 500, marginBottom:3 }}>
            {title}
          </Typography>
        }
        action={
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        }
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ pt: 1 }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {value}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowUpwardIcon fontSize="small" sx={{ color: 'success.main' }} />
          <Typography
            variant="body2"
            sx={{ color: 'success.main', fontWeight: 600 }}
          >
            {change}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', ml: 1 }}
          >
            {updatedAt}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

InfoCard.propTypes = {
  title:      PropTypes.string.isRequired,
  value:      PropTypes.string.isRequired,
  change:     PropTypes.string.isRequired,
  updatedAt:  PropTypes.string.isRequired,
};
