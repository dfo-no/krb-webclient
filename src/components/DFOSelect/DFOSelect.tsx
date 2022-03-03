import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material';

export interface DFOSelectProps {
  options: string[];
  field: any;
}

const DFOStyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-input': {
    border: `2px solid ${theme.palette.indigo.main}`,
    fontSize: 16,
    padding: '10px 26px 10px 12px'
  }
}));

export default function DFOSelect({
  options,
  field
}: DFOSelectProps): React.ReactElement {
  return (
    <DFOStyledSelect {...field}>
      {options.map((m) => {
        return (
          <MenuItem key={m} value={m}>
            {m}
          </MenuItem>
        );
      })}
    </DFOStyledSelect>
  );
}
