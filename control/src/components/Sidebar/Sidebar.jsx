// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import StarsIcon from '@mui/icons-material/Stars';

const drawerWidth = 72;

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  // quando ativo: formato “pill” roxo
  width: active ? 56 : 40,
  height: active ? 32 : 40,
  borderRadius: active ? 16 : '50%',
  backgroundColor: active ? '#E8DEF8' : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: active
    ? theme.palette.primary.main
    : theme.palette.text.primary,
  transition: 'all 0.2s',
}));

const MenuButton = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent',
  },
}));

const menuItems = [
  'Dashboard',
  'DRE',
  'DFC',
  'KPIs',
  'Orçamentos',
  'Simulação',
  'Previsões',
  'Grupo de contas',
].map((text) => ({
  text,
  icon: <StarsIcon fontSize="small" />,
}));

export default function Sidebar({ selectedItem, onSelect }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#fafafa',
          borderRight: '1px solid #eee',
          pt: 1, // aproxima os itens do topo
        },
      }}
    >
      <List disablePadding>
        {menuItems.map(({ text, icon }) => {
          const isActive = selectedItem === text;
          return (
            <ListItem key={text} disablePadding>
              <MenuButton
                selected={isActive}
                onClick={() => onSelect(text)}
              >
                <IconWrapper active={isActive}>
                  {icon}
                </IconWrapper>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.25,
                    textAlign: 'center',
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: isActive
                      ? 'text.primary'
                      : 'text.secondary',
                  }}
                >
                  {text}
                </Typography>
              </MenuButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
