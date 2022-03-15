import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputBase, styled } from '@mui/material';

export interface DFOSelectProps {
  options: string[];
}

const DFOSelectInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  border: `2px solid ${theme.palette.indigo.main}`,
  backgroundColor: theme.palette.dfoWhite.main,
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
    border: `2px solid ${theme.palette.dfoErrorRed.main}`,
    '&:hover': {
      borderColor: theme.palette.dfoErrorRed.main,
      borderWidth: 3
    },
    '&.Mui-focused': {
      borderColor: theme.palette.dfoErrorRed.main,
      borderWidth: 3
    }
  }
}));

export default function DFOSelect({
  options
}: DFOSelectProps): React.ReactElement {
  return (
    <Select input={<DFOSelectInput />}>
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
