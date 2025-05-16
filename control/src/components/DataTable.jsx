// src/components/DataTable.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
} from '@mui/material';

export default function DataTable({ rows, months, viewLabels }) {
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table
        size="small"
        sx={{
          borderCollapse: 'separate',
          borderSpacing: '8px 8px',
        }}
      >
        <TableHead>
          {/* linha 1: Real / Forecast alternados */}
          <TableRow>
            <TableCell rowSpan={2} sx={{ border: 0 }} />
            <TableCell rowSpan={2} sx={{ border: 0 }} />
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
          {/* linha 2: meses com novo azul #DEE0FF */}
          <TableRow>
            {months.map((m, i) => (
              <TableCell key={i} align="center" sx={{ p: 0, border: 0 }}>
                <Box
                  sx={{
                    py: 1,
                    px: 2,
                    bgcolor: '#DEE0FF',  // cor atualizada
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
          {rows.map((r, rowIdx) => (
            <TableRow key={r.label}>
              {/* coluna de descrição */}
              <TableCell sx={{ p: 0, border: 0 }}>
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

              {/* coluna de unidade */}
              <TableCell sx={{ p: 0, border: 0 }}>
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

              {/* células de valor */}
              {r.values.map((v, i) => (
                <TableCell key={i} align="center" sx={{ p: 0, border: 0 }}>
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
  );
}

DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      label:  PropTypes.string.isRequired,
      unit:   PropTypes.string.isRequired,
      values: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      ).isRequired,
    })
  ).isRequired,
  months:     PropTypes.arrayOf(PropTypes.string).isRequired,
  viewLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
