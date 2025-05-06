// src/components/Header/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Box, IconButton, InputBase, styled, Badge, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import logoImg from '../../images/kontroller-logo.svg'; // importe seu logo aqui

// Container do input de busca
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#f0f0f0',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  height: "100%",
  maxWidth: 1100,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
}));

// Input propriamente dito
const SearchInput = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

export default function Header() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ px: 2, py: 1 }}
    >
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 0.4 }} />
        {/* Logo */}
        <Box
          component="img"
          src={logoImg}
          alt="Kontrolle"
          sx={{ height: 40, mr: 2 }}
        />

        {/* Campo de busca */}
        <Search style={{borderRadius:40, marginLeft:150, backgroundColor: "#ECE6F0", height: 50}}>
          <SearchIcon sx={{ color: 'text.secondary' }} />
          <SearchInput
            placeholder="Pesquisar"
            inputProps={{ 'aria-label': 'pesquisar' }}
          />
        </Search>

        {/* Espaço flexível para empurrar os ícones para a direita */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Ícones de notificação, configuração e avatar */}
        <IconButton aria-label="notificações">
          <Badge badgeContent={4} color="error">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="configurações">
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton aria-label="perfil">
          <Avatar sx={{ width: 40, height: 40 }}>U</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
