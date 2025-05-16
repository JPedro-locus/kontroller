// src/components/TitleBar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

export default function TitleBar({
  title,

  // histórico
  showHistoryToggle = false,
  historyValue,
  onHistoryChange,

  // select
  showSelect = false,
  selectLabel,
  selectOptions = [],
  selectValue,
  onSelectChange,

  // botão criar
  showCreateButton = false,
  createButtonText,
  onCreate,

  // botão download
  showDownloadButton = false,
  downloadButtonText,
  onDownload,
}) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      sx={{ mt: 3 }}
    >
      {/* título + toggle histórico */}
      <Box display="flex" alignItems="center">
        <Typography variant="h4" component="h1" sx={{ mr: 2 }}>
          {title}
        </Typography>

        {showHistoryToggle && (
          <ToggleButtonGroup
            size="small"
            exclusive
            value={historyValue}
            onChange={onHistoryChange}
            sx={{
              // contorno arredondado ao redor do grupo
              border: '1px solid #C4C4D1',
              borderRadius: '20px',
              // remove espaçamento padrão entre botões
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: '20px',
                padding: '4px 16px',
                color: '#4B4B60',
              },
              // cor quando ativo
              '& .Mui-selected': {
                backgroundColor: '#F2F0FB',
                color: '#4B4B60',
              },
              // ajuste de tamanho
              minHeight: '32px',
            }}
          >
            <ToggleButton value="Histórico">Histórico</ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>

      {/* controles à direita */}
      <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
        {showSelect && (
          <FormControl size="small">
            <InputLabel
              sx={{ color: '#0040FE', ml: 1 }}
              id="titlebar-select-label"
            >
              {selectLabel}
            </InputLabel>
            <Select
              labelId="titlebar-select-label"
              value={selectValue}
              onChange={onSelectChange}
              label={selectLabel}
              variant="outlined"
              displayEmpty
              sx={{
                color: '#0040FE',
                borderRadius: '20px',
                minWidth: 180,
                height: 40,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0040FE',
                  borderWidth: 2,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0040FE',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0040FE',
                },
                '& .MuiSelect-icon': {
                  color: '#0040FE',
                },
                pl: 1.5,
                pr: 1.5,
              }}
            >
              {selectOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {showCreateButton && (
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onCreate}
            sx={{
              backgroundColor: '#DEE0FF',
              borderRadius: '20px',
              textTransform: 'none',
              height: 40,
            }}
          >
            {createButtonText}
          </Button>
        )}

        {showDownloadButton && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={onDownload}
            sx={{
              backgroundColor: '#0040FE',
              borderRadius: '20px',
              textTransform: 'none',
              height: 40,
            }}
          >
            {downloadButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,

  showHistoryToggle: PropTypes.bool,
  historyValue: PropTypes.string,
  onHistoryChange: PropTypes.func,

  showSelect: PropTypes.bool,
  selectLabel: PropTypes.string,
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  selectValue: PropTypes.any,
  onSelectChange: PropTypes.func,

  showCreateButton: PropTypes.bool,
  createButtonText: PropTypes.string,
  onCreate: PropTypes.func,

  showDownloadButton: PropTypes.bool,
  downloadButtonText: PropTypes.string,
  onDownload: PropTypes.func,
};
