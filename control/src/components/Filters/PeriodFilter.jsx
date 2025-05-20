import React, { useState } from 'react';
import {
  Button,
  Box,
  Menu,
  MenuItem,
  Popover,
  Typography,
  Divider,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FilterTag from './FilterTag';

export default function PeriodFilter({
  options, value, onChange, onClear,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [customAnchor, setCustomAnchor] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const openMenu = Boolean(anchorEl);
  const openCustom = Boolean(customAnchor);

  const handleItemClick = (opt) => {
    if (opt.value === 'custom') {
      // abre o popover de custom
      setCustomAnchor(anchorEl);
    } else {
      onChange(opt.value);
      setAnchorEl(null);
    }
  };

  return (
    <>
      {value
        ? <FilterTag label={value} onDelete={onClear} />
        : (
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            onClick={e => setAnchorEl(e.currentTarget)}
            sx={{ textTransform: 'none' }}
          >
            Período
          </Button>
        )
      }

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
      >
        {options.map(opt => (
          <MenuItem
            key={opt.value}
            onClick={() => handleItemClick(opt)}
            sx={{ justifyContent: 'space-between' }}
          >
            {opt.label}
            {opt.value === 'custom' && <KeyboardArrowRightIcon fontSize="small" />}
          </MenuItem>
        ))}
      </Menu>

      {/* Popover para custom range */}
      <Popover
        anchorEl={customAnchor}
        open={openCustom}
        onClose={() => {
          setCustomAnchor(null);
          setAnchorEl(null);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ p: 2, width: 300 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DatePicker
            label="Início"
            value={start}
            onChange={setStart}
            renderInput={params => <TextField {...params} />}
          />
          <DatePicker
            label="Fim"
            value={end}
            onChange={setEnd}
            renderInput={params => <TextField {...params} />}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Button onClick={() => setCustomAnchor(null)}>Cancelar</Button>
            <Button
              variant="contained"
              onClick={() => {
                onChange(`${start?.format('MM/YYYY')} – ${end?.format('MM/YYYY')}`);
                setCustomAnchor(null);
              }}
            >
              Aplicar
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
