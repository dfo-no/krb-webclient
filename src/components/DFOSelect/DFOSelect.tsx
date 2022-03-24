import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export interface DFOSelectProps {
  options: string[];
}

const StyledSelect = styled(InputBase)(({ theme }) => ({
  width: '100%',
  border: `2px solid ${theme.palette.indigo.main}`,
  backgroundColor: theme.palette.common.white,
  height: 45,
  paddingLeft: '10px',
  color: theme.palette.gray700.main,

  '&:hover': {
    border: `3px solid ${theme.palette.indigo.main}`
  },
  '&.Mui-focused': {
    border: `3px solid ${theme.palette.indigo.main}`
  },
  '&.Mui-error': {
    border: `2px solid ${theme.palette.errorRed.main}`,
    '&:hover': {
      borderColor: theme.palette.errorRed.main,
      borderWidth: 3
    },
    '&.Mui-focused': {
      borderColor: theme.palette.errorRed.main,
      borderWidth: 3
    }
  }
}));

export default function DFOSelect({
  options
}: DFOSelectProps): React.ReactElement {
  return (
    <Select input={<StyledSelect />}>
      {options.map((option) => {
        return (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        );
      })}
    </Select>
  );
}
