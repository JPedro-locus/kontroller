// src/components/FiltersBar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

function FilterTag({ label, onDelete }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#0040FE',
        borderRadius: '40px',
        height: 40,
        pl: 2,
        pr: 0.5,
      }}
    >
      <Typography variant="body2" sx={{ color: '#fff', whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ bgcolor: 'rgba(255,255,255,0.5)', mx: 1, height: 30 }}
      />
      <IconButton size="small" onClick={onDelete} sx={{ color: '#fff', p: 0 }}>
        <CancelIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default function FiltersBar({
  // filtros
  periodOptions, periodValue, onPeriodChange, onPeriodClear,
  yearOptions,   yearValue,   onYearChange,   onYearClear,
  kpiOptions,    kpiValue,    onKpiChange,    onKpiClear,
  scenarioOptions, scenarioValue, onScenarioChange, onScenarioClear,

  // pills de visão
  viewOptions, viewValue, onViewChange,

  // limpar todos
  onClearAll,
}) {
  const hasAny = Boolean(periodValue||yearValue||kpiValue||scenarioValue);

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
      {/* 1) Limpar filtros */}
      {hasAny && (
        <Button
          startIcon={<CancelIcon sx={{ color: '#D32F2F' }} />}
          onClick={onClearAll}
          sx={{
            bgcolor: '#FFEAEA',
            color: '#D32F2F',
            textTransform: 'none',
            borderRadius: '20px',
            height: 64,
            px: 2,
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              bgcolor: '#FFD7D7',
              boxShadow: '0px 6px 12px rgba(0,0,0,0.15)',
            },
          }}
        >
          Limpar filtros
        </Button>
      )}

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          mx: 1,
          height: 60,       // altura da linha
          width: 2,         // espessura da linha
          bgcolor: 'grey.300' // cor (opcional)
        }}
      />

      {/* 2) Período */}
      {periodOptions && (
        periodValue
          ? <FilterTag label={periodValue} onDelete={onPeriodClear} />
          : (
            <FormControl size="small" sx={{ minWidth: 140, height: 32 }}>
              <InputLabel sx={{marginTop: -0.5}}>Período</InputLabel>
              <Select
                label="Período"
                value={periodValue}
                onChange={onPeriodChange}
                sx={{ height: 40, borderRadius: 2, marginTop: -0.5 }}
              >
                <MenuItem value=""><em>Todos</em></MenuItem>
                {periodOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )
      )}

      {/* 3) Ano */}
      {yearOptions && (
        yearValue
          ? <FilterTag label={yearValue} onDelete={onYearClear} />
          : (
            <FormControl size="small" sx={{ minWidth: 100, height: 32 }}>
              <InputLabel sx={{marginTop: -0.5}}>Ano</InputLabel>
              <Select
                label="Ano"
                value={yearValue}
                onChange={onYearChange}
                sx={{ height: 40, borderRadius: 2, marginTop: -0.5 }}
              >
                <MenuItem value=""><em>Todos</em></MenuItem>
                {yearOptions.map(y => (
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )
      )}

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          mx: 1,
          height: 60,       // altura da linha
          width: 2,         // espessura da linha
          bgcolor: 'grey.300' // cor (opcional)
        }}
      />

      {/* 4) KPI */}
      {kpiOptions && (
        kpiValue
          ? <FilterTag label={kpiValue} onDelete={onKpiClear} />
          : (
            <FormControl size="small" sx={{ minWidth: 120, height: 32 }}>
              <InputLabel sx={{marginTop: -0.5}}>KPI</InputLabel>
              <Select
                label="KPI"
                value={kpiValue}
                onChange={onKpiChange}
                sx={{ height: 40, borderRadius: 2, marginTop: -0.5 }}
              >
                <MenuItem value=""><em>Todos</em></MenuItem>
                {kpiOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )
      )}

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          mx: 1,
          height: 60,       // altura da linha
          width: 2,         // espessura da linha
          bgcolor: 'grey.300' // cor (opcional)
        }}
      />

      {/* 5) pills de visão */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {viewOptions.map(opt => {
          const active = viewValue.includes(opt.value);
          return (
            <ToggleButton
              key={opt.value}
              value={opt.value}
              selected={active}
              onChange={() => {
                if (active) {
                  onViewChange(null, viewValue.filter(v => v !== opt.value));
                } else {
                  onViewChange(null, [...viewValue, opt.value]);
                }
              }}
              sx={{
                borderRadius: '10px',
                textTransform: 'none',
                bgcolor: active ? '#DEE0FF' : 'transparent',
                boxShadow: active
                  ? '0px 4px 8px rgba(0,0,0,0.1)'
                  : 'none',
                color: active ? '#0040FE' : 'text.secondary',
                '&:hover': {
                  bgcolor: active ? '#0040FE' : '#F5F5F5',
                },
              }}
            >
              {opt.label}
            </ToggleButton>
          );
        })}
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          mx: 1,
          height: 60,       // altura da linha
          width: 2,         // espessura da linha
          bgcolor: 'grey.300' // cor (opcional)
        }}
      />

      {/* 6) Cenários */}
      {scenarioOptions && (
        scenarioValue
          ? <FilterTag label={scenarioValue} onDelete={onScenarioClear} />
          : (
            <FormControl size="small" sx={{ minWidth: 140, height: 32 }}>
              <InputLabel sx={{marginTop: -0.5}}>Cenários</InputLabel>
              <Select
                label="Cenários"
                value={scenarioValue}
                onChange={onScenarioChange}
                sx={{ height: 40, borderRadius: 2, marginTop: -0.5 }}
              >
                <MenuItem value=""><em>Todos</em></MenuItem>
                {scenarioOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )
      )}
    </Box>
  );
}

FiltersBar.propTypes = {
  periodOptions:    PropTypes.array,
  periodValue:      PropTypes.any,
  onPeriodChange:   PropTypes.func,
  onPeriodClear:    PropTypes.func,

  yearOptions:      PropTypes.array,
  yearValue:        PropTypes.any,
  onYearChange:     PropTypes.func,
  onYearClear:      PropTypes.func,

  kpiOptions:       PropTypes.array,
  kpiValue:         PropTypes.any,
  onKpiChange:      PropTypes.func,
  onKpiClear:       PropTypes.func,

  scenarioOptions:  PropTypes.array,
  scenarioValue:    PropTypes.any,
  onScenarioChange: PropTypes.func,
  onScenarioClear:  PropTypes.func,

  viewOptions:      PropTypes.array.isRequired,
  viewValue:        PropTypes.any.isRequired,
  onViewChange:     PropTypes.func.isRequired,

  onClearAll:       PropTypes.func.isRequired,
};
