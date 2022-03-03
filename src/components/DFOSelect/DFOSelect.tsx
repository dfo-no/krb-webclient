import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputBase, styled } from '@mui/material';

export interface DFOSelectProps {
  options: any;
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}));

export default function DFOSelect({
  options
}: DFOSelectProps): React.ReactElement {
  const SelectIcon = () => {
    return <KeyboardArrowDownIcon />;
  };

  return (
    <Select value={0} IconComponent={SelectIcon}>
      {options.map((element: any, index: number) => (
        <MenuItem key={index} value={index} selected>
          {element}
        </MenuItem>
      ))}
    </Select>
  );
}
