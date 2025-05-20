import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import FilterTag from './FilterTag';

export default function KpiFilter({
  options, value, onChange, onClear,
}) {
  return (
    <>
      {value
        ? <FilterTag label={value} onDelete={onClear} />
        : (
          <Autocomplete
            size="small"
            options={options}
            value={value || null}
            onChange={(e, v) => onChange(v)}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="Buscar KPI"
                InputProps={{
                  ...params.InputProps,
                  sx: { borderRadius: 2 },
                }}
              />
            )}
            sx={{ minWidth: 180 }}
          />
        )
      }
    </>
  );
}
