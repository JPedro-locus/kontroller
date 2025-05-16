// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';

import DashboardIcon      from '@mui/icons-material/Dashboard';
import ShowChartIcon      from '@mui/icons-material/ShowChart';
import BarChartIcon       from '@mui/icons-material/BarChart';
import AssessmentIcon     from '@mui/icons-material/Assessment';
import ReceiptIcon        from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon       from '@mui/icons-material/Settings';
import AccountTreeIcon    from '@mui/icons-material/AccountTree';

const drawerWidth = 72;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    border: 'none',
    borderRadius: '0 16px 16px 0',
    overflow: 'hidden',
  },
}));

const IconWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  width: active ? 56 : 40,
  height: active ? 32 : 40,
  borderRadius: active ? 16 : '50%',
  backgroundColor: active
    ? theme.palette.primary.dark
    : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
}));

const MenuButton = styled(ListItemButton)(({ theme, selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  backgroundColor: selected
    ? theme.palette.primary.dark
    : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark + '33',
  },
}));

const menuItems = [
  { text: 'Dashboard',     icon: DashboardIcon,      to: '/dashboard' },
  { text: 'DRE',           icon: ShowChartIcon,      to: '/dre' },
  { text: 'DFC',           icon: BarChartIcon,       to: '/dfc' },
  { text: 'KPIs',          icon: AssessmentIcon,     to: '/kpis' },
  { text: 'Orçamentos',    icon: ReceiptIcon,        to: '/orcamentos' },
  { text: 'Simulação',     icon: MonetizationOnIcon, to: '/simulacao' },
  { text: 'Previsões',     icon: SettingsIcon,       to: '/previsoes' },
  { text: 'Grupo de contas', icon: AccountTreeIcon,  to: '/grupo-de-contas' },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <StyledDrawer variant="permanent">
      <List disablePadding sx={{ mt: 2 }}>
        {menuItems.map(({ text, icon: Icon, to }) => {
          const isActive = pathname === to;
          return (
            <ListItem key={text} disablePadding>
              <MenuButton
                component={NavLink}
                to={to}
                selected={isActive}
                end
              >
                <IconWrapper active={isActive}>
                  <Icon htmlColor="#fff" />
                </IconWrapper>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: '#fff',
                    textAlign: 'center',
                  }}
                >
                  {text}
                </Typography>
              </MenuButton>
            </ListItem>
          );
        })}
      </List>
    </StyledDrawer>
  );
}
