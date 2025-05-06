/* eslint-disable no-unused-vars */
// src/pages/DRE.jsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  TextField
} from '@mui/material';
import {
  Download as DownloadIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import Chart from 'react-apexcharts';

// ——— dados de exemplo ———
const months = Array(12).fill(0).map((_, i) => `Jan-22`);
const lineOptions = {
  chart: { type: 'line' },
  stroke: { curve: 'straight' },
  markers: { size: 4 },
  xaxis: { categories: [2020, 2021, 2022, 2023, 2024, 2025] },
  grid: { borderColor: '#e0e0e0' },
  dataLabels: { enabled: false }
};
const lineSeries = [{ name: 'Valor', data: [10, 30, 20, 50, 40, 70] }];

export default function DRE() {
  // filtros
  const [filters, setFilters] = useState({
    periodo: 'Mês',
    mes: 'Jan',
    ano: '2022',
    categoria: 'Todas'
  });
  const handleFilter = (field) => (e) =>
    setFilters((f) => ({ ...f, [field]: e.target.value }));

  // expandir linha de receita
  const [openReceita, setOpenReceita] = useState(false);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ width: '100%', p: 3 }}
    >
      {/* Título */}
      <Typography variant="h4" gutterBottom>
        DRE
      </Typography>

      {/* Filtros + Download */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Button
          variant="contained"
          sx={{ bgcolor: '#F8D7DA', color: '#842029', textTransform: 'none' }}
        >
          Resetar filtros
        </Button>

        <Box display="flex" gap={2}>
          {['periodo','mes','ano','categoria'].map((field) => (
            <FormControl size="small" key={field}>
              <InputLabel>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </InputLabel>
              <Select
                label={field}
                value={filters[field]}
                onChange={handleFilter(field)}
              >
                <MenuItem value={filters[field]}>
                  {filters[field]}
                </MenuItem>
                {/* mapear opções reais aqui */}
              </Select>
            </FormControl>
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          sx={{ textTransform: 'none' }}
        >
          Download
        </Button>
      </Box>

      {/* Tabela DRE */}
      <TableContainer component={Paper} sx={{ width: '100%', borderRadius: 2, mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Real vs Orçado</TableCell>
              <TableCell>DRE</TableCell>
              {months.map((m, i) => (
                <TableCell align="center" key={i}>{m}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Linha principal */}
            <TableRow>
              <TableCell>
                <IconButton size="small" onClick={() => setOpenReceita(o => !o)}>
                  {openReceita ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                Receita Bruta
              </TableCell>
              <TableCell>R$ '000'</TableCell>
              {months.map((_, i) => (
                <TableCell
                  key={i}
                  align="center"
                  sx={{
                    bgcolor:
                      i === 3 ? '#E6F4A4'
                        : i === 8 ? '#F8D7DA'
                        : 'transparent'
                  }}
                >
                  0000
                </TableCell>
              ))}
            </TableRow>

            {/* Linhas filhas */}
            {openReceita && [
              'Receita Recorrente',
              'Receita não Recorrente',
              '(-) Deduções'
            ].map((label) => (
              <TableRow key={label}>
                <TableCell sx={{ pl: 4 }}>{label}</TableCell>
                <TableCell>R$ '000'</TableCell>
                {months.map((_, i) => (
                  <TableCell key={i} align="center">0000</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Visão resumida */}
      <Typography variant="h6" gutterBottom>
        Visão resumida
      </Typography>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%', p: 2, borderRadius: 2 }}>
            <Chart options={lineOptions} series={lineSeries} type="line" height={500} width={950} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{height: 545, width: 750, p: 2, borderRadius: 2 }}>
            <Typography variant="body2" fontWeight={500} gutterBottom>
              Resumo
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet. Hic quos illo vel repellat...
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Comparar períodos */}
      <Typography variant="h6" gutterBottom>
        Comparar períodos
      </Typography>
      <Grid container spacing={2}>
        {/* Período 1 */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              bgcolor: '#F4F1FA',
              p: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Período 1
            </Typography>
            <Grid container spacing={1} mb={1}>
              <Grid item xs={6}>
                <TextField fullWidth size="small" label="Start date" placeholder="mm/yyyy" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" label="End date" placeholder="mm/yyyy" />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between">
              <Button size="small">Limpar</Button>
              <Button size="small">OK</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Período 2 */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              bgcolor: '#E8F6EF',
              p: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Período 2
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField fullWidth size="small" label="Start date" placeholder="mm/yyyy" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" label="End date" placeholder="mm/yyyy" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Botão Adicionar */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              bgcolor: '#F4F1FA',
              p: 2,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              cursor: 'pointer'
            }}
          >
            <Typography color="primary" fontWeight="bold">
              + Adicionar
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <div style={{marginTop: 20}}>
        <Grid container spacing={2} mb={4}>
            <Grid item xs={12} md={8}>
                <Paper sx={{ width: '100%', p: 2, borderRadius: 2 }}>
                    <Chart options={lineOptions} series={lineSeries} type="line" height={500} width={950} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper sx={{ height: 545, width: 750, p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight={500} gutterBottom>
                    Resumo
                    </Typography>
                    <Typography variant="body2">
                    Lorem ipsum dolor sit amet. Hic quos illo vel repellat...
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
      </div>
    </Container>
  );
}
