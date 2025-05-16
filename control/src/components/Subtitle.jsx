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
      sx={{marginTop:3}}
    >
      {/* título + toggle histórico */}
      <Box display="flex" alignItems="center">
        <Typography variant="h4" component="h1" sx={{ mr: 2 }}>
          {title}
        </Typography>

        {showHistoryToggle && (
          <ToggleButtonGroup
            size="small"
            value={historyValue}
            exclusive
            onChange={onHistoryChange}
          >
            <ToggleButton value="Histórico">Histórico</ToggleButton>
            {/* adicione outros toggles se precisar */}
          </ToggleButtonGroup>
        )}
      </Box>

      {/* controles à direita */}
      <Box display="flex" alignItems="center">
        {showSelect && (
          <FormControl size="small" sx={{ minWidth: 160, mr: 1, color: '#0040FE', borderRadius: 10 }}>
            <InputLabel>{selectLabel}</InputLabel>
            <Select
              label={selectLabel}
              value={selectValue}
              onChange={onSelectChange}
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
            sx={{ mr: 1, backgroundColor: '#DEE0FF', borderRadius: 20 }}
            onClick={onCreate}
          >
            {createButtonText}
          </Button>
        )}

        {showDownloadButton && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={onDownload}
            sx={{ backgroundColor: '#0040FE', borderRadius: 20 }}
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
