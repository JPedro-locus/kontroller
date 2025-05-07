// src/pages/Register.jsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button
} from '@mui/material';

export default function Register() {
  const [form, setForm] = useState({
    empresa: '',
    nome: '',
    documento: '', // CPF ou CNPJ
    email: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.empresa)    newErrors.empresa    = 'Informe a empresa';
    if (!form.nome)       newErrors.nome       = 'Informe o nome';
    if (!form.documento)  newErrors.documento  = 'Informe o CPF ou CNPJ';
    if (!form.email)      newErrors.email      = 'Informe o e-mail';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'E-mail inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // aqui você enviaria `form` para a API
    console.log('Formulário válido:', form);
    // limpar form, mostrar mensagem, etc.
  };

  return (
    <Container maxWidth="sm" disableGutters sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Usuário
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Empresa */}
          <Grid item xs={12}>
            <TextField
              label="Empresa"
              value={form.empresa}
              onChange={handleChange('empresa')}
              fullWidth
              error={!!errors.empresa}
              helperText={errors.empresa}
            />
          </Grid>

          {/* Nome */}
          <Grid item xs={12}>
            <TextField
              label="Nome"
              value={form.nome}
              onChange={handleChange('nome')}
              fullWidth
              error={!!errors.nome}
              helperText={errors.nome}
            />
          </Grid>

          {/* CPF ou CNPJ */}
          <Grid item xs={12}>
            <TextField
              label="CPF ou CNPJ"
              value={form.documento}
              onChange={handleChange('documento')}
              fullWidth
              error={!!errors.documento}
              helperText={errors.documento}
              placeholder="000.000.000-00 ou 00.000.000/0001-00"
            />
          </Grid>

          {/* E-mail */}
          <Grid item xs={12}>
            <TextField
              label="E-mail"
              value={form.email}
              onChange={handleChange('email')}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              type="email"
            />
          </Grid>
        </Grid>

        <Box textAlign="right" mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
