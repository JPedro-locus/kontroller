import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Chip,
  Divider
} from '@mui/material';
import { ArrowBackIosNew, Clear, Add, NoEncryption } from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';  

export default function CreateKPI() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [formula, setFormula] = useState('');
  const [formatting, setFormatting] = useState([]);

  const handleAddFormatting = () => {
    setFormatting([{ id: Date.now(), label: 'Formatação condicional' }]);
  };
  const handleRemoveFormatting = () =>
    setFormatting([]);
  const handleClear = () => {
    setName(''); setCategory(''); setUnit(''); setFormula(''); setFormatting([]);
  };
  const handleSave = () => {
    console.log({ name, category, unit, formula, formatting });
    navigate('/kpis'); 
  };

  return (
    <Container maxWidth={false} disableGutters>
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, px: 3, pt: 3 }}>
        <IconButton onClick={() => navigate('/kpis')}>  {/* ← navega aqui */}
          <ArrowBackIosNew fontSize="small" />
        </IconButton>
        <Typography variant="h5" sx={{ ml: 1 }}>
          KPIs
        </Typography>
      </Box>

      {/* Card geral */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: '#F8F6FF',
          borderRadius: 2,
          mx: 3,
          mb: 3,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Coluna esquerda */}
          <Box sx={{ flex: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Dados básicos
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Nome"
                placeholder="Digite o nome do KPI…"
                value={name}
                onChange={e => setName(e.target.value)}
                InputProps={{
                  endAdornment: name && (
                    <IconButton size="small" onClick={() => setName('')}>
                      <Clear fontSize="small" />
                    </IconButton>
                  )
                }}
                helperText="Obrigatório"
                FormHelperTextProps={{
                  sx: { backgroundColor: '#F8F6FF' }
                }}
                sx={{ mb: 2, backgroundColor: '#F8F6FF', borderRadius: 1 }}
              />

              <FormControl fullWidth size="medium" sx={{ mb: 2, backgroundColor: '#F8F6FF', borderRadius: 1 , border: 'none'}}>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={category}
                  label="Categoria"
                  onChange={e => setCategory(e.target.value)}
                >
                  <MenuItem value=""><em>Selecione…</em></MenuItem>
                  <MenuItem value="financeiro">Financeiro</MenuItem>
                  <MenuItem value="operacional">Operacional</MenuItem>
                  <MenuItem value="comercial">Comercial</MenuItem>
                </Select>
                <Typography variant="caption" sx={{ backgroundColor: '#F8F6FF' }}>
                  Obrigatório
                </Typography>
              </FormControl>

              <FormControl fullWidth size="medium" sx={{ backgroundColor: '#F8F6FF', borderRadius: 1 }}>
                <InputLabel>Unidade</InputLabel>
                <Select
                  value={unit}
                  label="Unidade"
                  onChange={e => setUnit(e.target.value)}
                >
                  <MenuItem value=""><em>Selecione…</em></MenuItem>
                  <MenuItem value="R$'000">R$ '000</MenuItem>
                  <MenuItem value="percent">%</MenuItem>
                  <MenuItem value="unit">Unit</MenuItem>
                </Select>
                <Typography variant="caption" sx={{ backgroundColor: '#F8F6FF' }}>
                  Obrigatório
                </Typography>
              </FormControl>
            </Box>
          </Box>

          {/* Divisor vertical */}
          <Divider orientation="vertical" flexItem />

          {/* Coluna direita */}
          <Box sx={{ flex: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Fórmula e formatação
            </Typography>

            <TextField
              fullWidth
              size="medium"
              label="Digite a fórmula"
              placeholder="Digite e.g. valor1 / valor2 * 100"
              value={formula}
              onChange={e => setFormula(e.target.value)}
              InputProps={{
                endAdornment: formula && (
                  <IconButton size="small" onClick={() => setFormula('')}>
                    <Clear fontSize="small" />
                  </IconButton>
                )
              }}
              helperText="Digite @ para ver variáveis disponíveis"
              FormHelperTextProps={{
                sx: { backgroundColor: '#F8F6FF' }
              }}
              sx={{ mb: 2, backgroundColor: '#F8F6FF', borderRadius: 1 }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Button
                size="medium"
                variant="contained"
                onClick={handleAddFormatting}
                sx={{backgroundColor: '#0040FE', borderRadius: 20, fontSize: 10, padding:1.5, paddingLeft: 3, paddingRight: 3}}
              >
                <Add sx={{marginRight:1}}/> Adicionar
              </Button>

              {formatting.length > 0 && (
                <Chip
                  label={formatting[0].label}
                  onDelete={handleRemoveFormatting}
                  sx={{
                    bgcolor: pink[100],
                    color: pink[800],
                  }}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, marginTop:30 }}>
              <Button onClick={handleClear}>Limpar</Button>
              <Button variant="contained" onClick={handleSave} sx={{backgroundColor: '#0040FE', borderRadius: 20,padding:1.5,paddingLeft: 3, paddingRight: 3}}>
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
