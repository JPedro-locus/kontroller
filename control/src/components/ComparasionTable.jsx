// src/components/ComparisonTable.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default function ComparisonTable({ rows, monthsByPeriod }) {
  // mesesByPeriod: ex. [['Jan-22','Jan-22'], ['Fev-22','Fev-22'], ...]
  const viewLabels = ['Real','fcst'];

  return (
    <Box display="flex" alignItems="flex-start" gap={2} sx={{ overflowX: 'auto' }}>
      {/* 1) Coluna fixa */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table size="small" sx={{ borderCollapse: 'separate', borderSpacing: '8px' }}>
          <TableBody>
            {rows.map((r, idx) => (
              <TableRow key={r.label}>
                <TableCell sx={{ p: 0, border: 0, width: 200 }}>
                  <Box
                    sx={{
                      py: 1,
                      px: 2,
                      bgcolor: '#FBF8FF',
                      borderRadius: 2,
                    }}
                  >
                    {r.label}
                  </Box>
                </TableCell>
                <TableCell sx={{ p: 0, border: 0, width:  80 }}>
                  <Box
                    sx={{
                      py: 1,
                      px: 2,
                      bgcolor: 'grey.100',
                      borderRadius: 2,
                    }}
                  >
                    {r.unit}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 2) Blocos de comparação */}
      {monthsByPeriod.map((months, periodIdx) => (
        <TableContainer
          key={periodIdx}
          component={Paper}
          sx={{
            border: '1px solid #5566FF',
            borderRadius: 2,
            boxShadow: 'none',
            minWidth: 160,
          }}
        >
          <Table size="small" sx={{ borderCollapse: 'separate', borderSpacing: '8px' }}>
            <TableHead>
              {/* Cabeçalho Real / fcst */}
              <TableRow>
                {viewLabels.map((label, i) => (
                  <TableCell key={i} align="center" sx={{ p: 0, border: 0 }}>
                    <Box
                      sx={{
                        py: 1,
                        px: 2,
                        bgcolor: i % 2 === 0 ? 'grey.300' : 'grey.200',
                        borderRadius: 2,
                      }}
                    >
                      {label}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
              {/* Cabeçalho mês */}
              <TableRow>
                {months.map((m, i) => (
                  <TableCell key={i} align="center" sx={{ p: 0, border: 0 }}>
                    <Box
                      sx={{
                        py: 1,
                        px: 2,
                        bgcolor: '#DEE0FF',
                        borderRadius: 2,
                      }}
                    >
                      {m}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Valores por linha */}
              {rows.map((r, rowIdx) => (
                <TableRow key={r.label}>
                  {r.values[periodIdx].map((v, cellIdx) => (
                    <TableCell key={cellIdx} align="center" sx={{ p: 0, border: 0 }}>
                      <Box
                        sx={{
                          py: 1,
                          px: 2,
                          bgcolor: rowIdx % 2 === 0 ? 'grey.50' : 'transparent',
                          borderRadius: 2,
                        }}
                      >
                        {v}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Box>
  );
}

ComparisonTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      label:  PropTypes.string.isRequired,
      unit:   PropTypes.string.isRequired,
      // para cada linha, `values` é um array *de períodos*,
      // e cada período tem [realValue, forecastValue]
      values: PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        ).isRequired
      ).isRequired,
    })
  ).isRequired,
  // um array de períodos; para cada período um array de meses [mêsReal, mêsFcst]
  monthsByPeriod: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string).isRequired
  ).isRequired,
};
