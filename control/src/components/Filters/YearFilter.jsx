import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterTag from './FilterTag';

export default function YearFilter({
  options, value, onChange, onClear,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
            Ano
          </Button>
        )
      }

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {options.map(year => (
          <MenuItem
            key={year}
            selected={year === value}
            onClick={() => {
              onChange(year);
              setAnchorEl(null);
            }}
          >
            {year}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
