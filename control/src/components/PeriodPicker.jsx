import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  Stack,
  useTheme
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * PeriodPicker
 *
 * Props:
 *  - label: string (e.g. "Período 1")
 *  - onConfirm: function({ start, end })
 *  - onCancel?: function()
 */
export default function PeriodPicker({ label = 'Período', onConfirm, onCancel }) {
  const theme = useTheme();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [focusCount, setFocusCount] = useState(0);
  const [error, setError] = useState(false);

  const isActive = focusCount > 0;

  const handleFocus = () => {
    setFocusCount(c => c + 1);
    if (error) setError(false);
  };

  const handleBlur = () => {
    setFocusCount(c => {
      const next = c - 1;
      if (next <= 0) validate();
      return Math.max(0, next);
    });
  };

  const validate = () => {
    const rx = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
    if (!rx.test(start) || !rx.test(end)) {
      setError(true);
      return false;
    }
    const [sm, sy] = start.split('/').map(v => parseInt(v, 10));
    const [em, ey] = end.split('/').map(v => parseInt(v, 10));
    const dateStart = new Date(sy, sm - 1);
    const dateEnd = new Date(ey, em - 1);
    if (dateStart > dateEnd) {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  const handleClear = () => {
    setStart('');
    setEnd('');
    setError(false);
  };

  const handleCancel = () => {
    handleClear();
    onCancel?.();
  };

  const handleOk = () => {
    if (validate()) onConfirm?.({ start, end });
  };

  const borderColor = error
    ? theme.palette.error.main
    : isActive
    ? theme.palette.primary.main
    : theme.palette.grey[400];
  const labelColor = error
    ? theme.palette.error.main
    : isActive
    ? theme.palette.primary.main
    : theme.palette.text.secondary;

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        position: 'relative',
        bgcolor: error ? '#FFDADB' : "#FBF8FF",
        minHeight: 160, // mantém sempre a altura do estado ativo
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 2, color: labelColor }}>
        {label}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {[
          { key: 'start', label: 'Início', value: start, setter: setStart },
          { key: 'end', label: 'Fim', value: end, setter: setEnd }
        ].map(field => (
          <FormControl
            key={field.key}
            variant="outlined"
            size="small"
            error={error}
            focused={isActive}
            sx={{
              width: 120,
              '& .MuiOutlinedInput-notchedOutline': { borderColor },
              '& .MuiInputLabel-root': {
                color: labelColor,
                bgcolor: "#FFDADB",
                px: 0.5,
                transform: 'translate(14px, -20px)' // espaço maior acima da borda
              },
              '& .MuiInputLabel-shrink': {
                bgcolor:'#FBF8FF',
                transform: 'translate(14px, -20px)'
              }
            }}
          >
            <InputLabel>{field.label}</InputLabel>
            <OutlinedInput
              label={field.label}
              placeholder="mm/yyyy"
              value={field.value}
              onChange={e => field.setter(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              endAdornment={
                error && (
                  <InputAdornment position="end">
                    <ErrorOutlineIcon color="error" />
                  </InputAdornment>
                )
              }
            />
          </FormControl>
        ))}
      </Stack>

      {error && (
        <Typography variant="caption" sx={{ mt: 1, color: 'error.main' }}>
          Intervalo não correspondente
        </Typography>
      )}

      {isActive && !error && (
        <Stack direction="row"  >
          <Button variant="text" onClick={handleClear} sx={{ minWidth: 0 , fontSize:12, marginRight:10 }}>
            Limpar
          </Button>
          <Button variant="text" onClick={handleCancel} sx={{ minWidth: 0, fontSize:12 }}>
            Cancelar
          </Button>
          <Button variant="text" onClick={handleCancel} sx={{ minWidth: 0, fontSize:12 }}>
            OK
          </Button>
        </Stack>
      )}
    </Box>
  );
}