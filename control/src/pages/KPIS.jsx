// src/pages/KPIs.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
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
  Grid
} from '@mui/material';
import { Add as AddIcon, Download as DownloadIcon } from '@mui/icons-material';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

export default function KPIs({ onCreate }) {
  // filtros de topo
  const [historia, setHistoria] = useState('Histórico');
  const [period, setPeriod]     = useState('');
  const [year,   setYear]       = useState('');
  const [kpi,    setKpi]        = useState('');
  const [view,   setView]       = useState('realOrcado');
  const [scenario, setScenario] = useState('');
  const [baseBudget, setBaseBudget] = useState('');
  const [search, setSearch]     = useState('');

  // dados de exemplo da tabela
  const months = ['Jan-22','Fev-22','Mar-22','Abr-22','Mai-22','Jun-22','Jul-22','Ago-22'];
  const rows = [
    { label: 'Lorem ipsum', unit: "R$'000'", values: [100,200,150,180,210,170,190,205] },
    { label: 'Dolor sit',   unit: 'Unit',   values: [10,12,9,15,14,11,16,18] },
    // … mais indicadores
  ];

  return (
    <Box sx={{ display:'flex', height:'98vh', width:'98vw' }}>
      <Sidebar selectedItem="KPIs" onSelect={() => {}} />

      <Box sx={{ flexGrow:1, overflow:'auto' }}>

        <Container maxWidth={false} disableGutters>
          {/* título + histórico toggle */}
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h4" sx={{ mr:2 }}>KPIs</Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={historia}
              onChange={(_, v) => v && setHistoria(v)}
            >
              <ToggleButton value="Histórico">Histórico</ToggleButton>
              <ToggleButton value="Projetado">Projetado</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* filtros de linha 1 */}
          <Grid container spacing={2} alignItems="center" mb={2}>
            {[
              { label:'Período',   value: period,   onChange: e => setPeriod(e.target.value),  options:['Mensal','Trimestral','Anual'] },
              { label:'Ano',       value: year,     onChange: e => setYear(e.target.value),      options:[2025,2024,2023,2022] },
              { label:'KPI',       value: kpi,      onChange: e => setKpi(e.target.value),       options:['MRR','Churn','CAC'] },
            ].map((f) => (
              <Grid item key={f.label}>
                <FormControl size="small" sx={{ minWidth:120 }}>
                  <InputLabel>{f.label}</InputLabel>
                  <Select value={f.value} label={f.label} onChange={f.onChange}>
                    {f.options.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}

            {/* Toggle buttons Real X Orçado, Forecast, Favoritos */}
            <Grid item>
              <ToggleButtonGroup
                size="small"
                exclusive
                value={view}
                onChange={(_, v) => v && setView(v)}
              >
                <ToggleButton value="realOrcado">Real X Orçado</ToggleButton>
                <ToggleButton value="forecast">Forecast</ToggleButton>
                <ToggleButton value="favoritos">Favoritos</ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            {/* Cenários dropdown */}
            <Grid item>
              <FormControl size="small" sx={{ minWidth:140 }}>
                <InputLabel>Cenários</InputLabel>
                <Select
                  value={scenario}
                  label="Cenários"
                  onChange={e => setScenario(e.target.value)}
                >
                  {['Base','Otimista','Pessimista'].map(s => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* linha 2: orçamento base, criar KPI, download, search */}
          <Box display="flex" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
            <FormControl size="small" sx={{ minWidth:160 }}>
              <InputLabel>Orçamento base</InputLabel>
              <Select
                value={baseBudget}
                label="Orçamento base"
                onChange={(e) => setBaseBudget(e.target.value)}
              >
                {['jan','fev','mar'].map(o => (
                  <MenuItem key={o} value={o}>{o}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              size="small"
              onClick={onCreate}                // ← aqui
            >
              Criar KPI
            </Button>

            <Button
              startIcon={<DownloadIcon />}
              variant="contained"
              size="small"
            >
              Download
            </Button>

            <TextField
              size="small"
              placeholder="Digite aqui…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ flexGrow:1, minWidth:200 }}
            />
          </Box>

          {/* tabela de indicadores */}
          <Typography variant="h6" gutterBottom>Indicadores</Typography>
          <TableContainer component={Paper} sx={{ mb:4 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Indicador</TableCell>
                  <TableCell>Un.</TableCell>
                  {months.map(m => <TableCell key={m} align="center">{m}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(r => (
                  <TableRow key={r.label}>
                    <TableCell>{r.label}</TableCell>
                    <TableCell>{r.unit}</TableCell>
                    {r.values.map((v,i) => (
                      <TableCell key={i} align="center">{v}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* nenhum KPI */}
          {rows.length === 0 && (
            <Typography color="text.secondary">
              Nenhum KPI foi associado a esta categoria até o momento.
            </Typography>
          )}

          {/* comparar períodos */}
          <Typography variant="h6" gutterBottom>Comparar períodos</Typography>
          <Grid container spacing={2}>
            {['Período 1','Período 2','+ Adicionar período'].map((label, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper
                  sx={{
                    p:2, borderRadius:2,
                    bgcolor: i === 2 ? 'transparent' : (i===1?'#E8F6EF':'#F4F1FA'),
                    minHeight: 150,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="subtitle2">{label}</Typography>
                  {i < 2 ? (
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Início"
                          placeholder="mm/yyyy"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Fim"
                          placeholder="mm/yyyy"
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <Box
                      sx={{
                        flexGrow:1,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        border:'1px dashed',
                        borderRadius:1
                      }}
                    >
                      <Typography color="primary">+ Adicionar período</Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
