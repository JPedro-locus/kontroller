import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Box,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import loginIllustration from '../images/login-illustration.svg';
import signupIllustration from '../images/cadastro-ilustration.svg';

const Login = ({ onLogin, onSignUp }) => {
  const [tab, setTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validEmail = 'joao.ribeiro@locus.ne';
  const validPassword = '12345Aa@';

  const handleAction = () => {
    if (tab === 'login') {
      if (email === validEmail && password === validPassword) {
        setError('');
        onLogin();
      } else {
        setError('Credenciais inválidas');
      }
    } else {
      onSignUp();
    }
  };

  return (
    <Grid container sx={{ height: '98vh', width: '98vw' }}>
      {/* esquerda: ilustração */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          width: '55%'
        }}
      >
        <Box
          component="img"
          src={tab === 'login' ? loginIllustration : signupIllustration}
          alt={tab === 'login' ? 'Ilustração de login' : 'Ilustração de cadastro'}
          sx={{
            width: tab === 'login' ? '70%' : '65%',
            height: 'auto',
          }}
        />
      </Grid>

      {/* direita: formulário */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 650 }}>
          {/* título */}
          <Box mb={10}>
            <Typography variant="h3" color="#0040FE" align="center" gutterBottom>
              {tab === 'login' ? 'Bem - Vindo!' : 'Cadastre-se'}
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              Simplifique. Entenda. Decida com inteligência financeira.
            </Typography>
          </Box>

          {/* toggle */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mb: 4,
              marginBottom: 12
            }}
          >
            <Button
              onClick={() => { setTab('login'); setError(''); }}
              variant={tab === 'login' ? 'contained' : 'text'}
              startIcon={<ArrowForwardIosIcon />}
              sx={{ borderRadius: '999px', textTransform: 'none', px: 3 }}
            >
              Login
            </Button>
            <Button
              onClick={() => { setTab('signup'); setError(''); }}
              variant={tab === 'signup' ? 'contained' : 'text'}
              startIcon={<EditIcon />}
              sx={{ borderRadius: '999px', textTransform: 'none', px: 3 }}
            >
              Cadastrar-se
            </Button>
          </Box>

          {/* campos */}
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              placeholder="Digite seu e-mail"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
            <TextField
              variant="outlined"
              placeholder="Digite sua senha"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(v => !v)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {tab === 'signup' && (
              <TextField
                variant="outlined"
                placeholder="Confirme sua senha"
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            )}
          </Stack>

          {/* esqueceu senha */}
          {tab === 'login' && (
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Box>
          )}

          {/* ação final */}
          <Button
            onClick={handleAction}
            variant="contained"
            fullWidth
            startIcon={tab === 'login' ? <ArrowForwardIosIcon /> : <EditIcon />}
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: '999px',
              textTransform: 'none'
            }}
          >
            {tab === 'login' ? 'Login' : 'Cadastrar'}
          </Button>

          {/* mensagem de erro */}
          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {/* rodapé */}
          <Typography
            variant="caption"
            color="textSecondary"
            display="block"
            textAlign="center"
            sx={{ mt: 3 }}
          >
            {tab === 'login'
              ? 'Ao aceitar realizar o login, eu aceito os Termos de Uso e a Política de Privacidade de Empresa.'
              : 'Ao realizar o cadastro, eu aceito os Termos de Uso e a Política de Privacidade da Empresa.'}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
