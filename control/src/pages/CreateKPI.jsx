import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ClearIcon from '@mui/icons-material/Clear';

export default function CreateKPI({ onBack }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [formula, setFormula] = useState('');
  const [formatting, setFormatting] = useState([]);

  const handleAddFormatting = () => {
    setFormatting(f => [...f, { id: Date.now(), label: 'Nova regra' }]);
  };
  const handleRemoveFormatting = id => setFormatting(f => f.filter(x => x.id !== id));
  const handleClear = () => {
    setName(''); setCategory(''); setUnit(''); setFormula(''); setFormatting([]);
  };
  const handleSave = () => {
    console.log({ name, category, unit, formula, formatting });
  };

  return (
    <Container maxWidth={false} disableGutters>
      {/* Breadcrumb / back */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <IconButton onClick={onBack}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h4">Criar KPI</Typography>
      </Box>

      <Grid container spacing={2} px={3} sx={{ pb: 3 }}>
        {/* Dados básicos */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Dados básicos</Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth label="Nome" placeholder="Digite o nome do KPI…"
                value={name} onChange={e => setName(e.target.value)}
                InputProps={{
                  endAdornment: name && (
                    <IconButton size="small" onClick={() => setName('')}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )
                }}
                helperText="Obrigatório"
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={category} label="Categoria"
                  onChange={e => setCategory(e.target.value)}
                >
                  <MenuItem value=""><em>Selecione…</em></MenuItem>
                  <MenuItem value="financeiro">Financeiro</MenuItem>
                  <MenuItem value="operacional">Operacional</MenuItem>
                  <MenuItem value="comercial">Comercial</MenuItem>
                </Select>
                <Typography variant="caption" color="text.secondary">Obrigatório</Typography>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Unidade</InputLabel>
                <Select
                  value={unit} label="Unidade"
                  onChange={e => setUnit(e.target.value)}
                >
                  <MenuItem value=""><em>Selecione…</em></MenuItem>
                  <MenuItem value="R$'000">R$ '000</MenuItem>
                  <MenuItem value="percent">%</MenuItem>
                  <MenuItem value="unit">Unit</MenuItem>
                </Select>
                <Typography variant="caption" color="text.secondary">Obrigatório</Typography>
              </FormControl>
            </Box>
          </Paper>
        </Grid>

        {/* Fórmula e formatação */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Fórmula e formatação</Typography>
            <TextField
              fullWidth size="small" label="Digite a fórmula"
              placeholder="Digite e.g. `valor1 / valor2 * 100`"
              value={formula} onChange={e => setFormula(e.target.value)}
              InputProps={{
                endAdornment: formula && (
                  <IconButton size="small" onClick={() => setFormula('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )
              }}
              helperText="Digite @ para ver variáveis disponíveis"
              sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 2 }}>
              <Button size="small" variant="outlined" onClick={handleAddFormatting} sx={{ mr: 1 }}>
                + Adicionar
              </Button>
              <Button
                size="small" variant="contained" color="secondary"
                disabled={formatting.length === 0}
              >
                Formatação condicional
              </Button>
            </Box>

            {formatting.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formatting.map(item => (
                  <Chip
                    key={item.id}
                    label={item.label}
                    onDelete={() => handleRemoveFormatting(item.id)}
                  />
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={handleClear}>Limpar</Button>
              <Button variant="contained" onClick={handleSave}>Salvar</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
