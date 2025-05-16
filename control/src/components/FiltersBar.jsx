// src/components/FiltersBar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from '@mui/material';

export default function FiltersBar({
  // dropdown “Período”
  periodOptions,
  periodValue,
  onPeriodChange,
  // dropdown “Ano”
  yearOptions,
  yearValue,
  onYearChange,
  // dropdown “KPI”
  kpiOptions,
  kpiValue,
  onKpiChange,
  // toggle Real X Orçado / Forecast / Favoritos
  viewOptions,
  viewValue,
  onViewChange,
  // dropdown “Cenários”
  scenarioOptions,
  scenarioValue,
  onScenarioChange,
}) {
  return (
    <Grid container alignItems="center" spacing={2}>
      {/* Período */}
      <Grid item>
        <FormControl size="small" sx={{ minWidth: 150,marginRight: 2 }}>
          <InputLabel>Período</InputLabel>
          <Select
            value={periodValue}
            label="Período"
            onChange={onPeriodChange}
          >
            {periodOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Ano */}
      <Grid item>
        <FormControl size="small" sx={{ minWidth: 150,marginRight: 2 }}>
          <InputLabel>Ano</InputLabel>
          <Select
            value={yearValue}
            label="Ano"
            onChange={onYearChange}
          >
            {yearOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* KPI */}
      <Grid item>
        <FormControl size="small" sx={{ minWidth: 150,marginRight: 2 }}>
          <InputLabel>KPI</InputLabel>
          <Select
            value={kpiValue}
            label="KPI"
            onChange={onKpiChange}
          >
            {kpiOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* ToggleView */}
      <Grid item>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={viewValue}
          onChange={onViewChange}
        >
          {viewOptions.map((opt) => (
            <ToggleButton key={opt.value} value={opt.value}>
              {opt.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>

      {/* Divider vertical */}
      <Grid item>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      </Grid>

      {/* Cenários */}
      <Grid item>
        <FormControl size="small" sx={{ minWidth: 150,marginRight: 2 }}>
          <InputLabel>Cenários</InputLabel>
          <Select
            value={scenarioValue}
            label="Cenários"
            onChange={onScenarioChange}
          >
            {scenarioOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

FiltersBar.propTypes = {
  periodOptions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })
  ).isRequired,
  periodValue: PropTypes.any,
  onPeriodChange: PropTypes.func.isRequired,

  yearOptions: PropTypes.array.isRequired,
  yearValue: PropTypes.any,
  onYearChange: PropTypes.func.isRequired,

  kpiOptions: PropTypes.array.isRequired,
  kpiValue: PropTypes.any,
  onKpiChange: PropTypes.func.isRequired,

  viewOptions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })
  ).isRequired,
  viewValue: PropTypes.any,
  onViewChange: PropTypes.func.isRequired,

  scenarioOptions: PropTypes.array.isRequired,
  scenarioValue: PropTypes.any,
  onScenarioChange: PropTypes.func.isRequired,
};
