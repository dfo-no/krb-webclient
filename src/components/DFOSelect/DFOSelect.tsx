import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, styled } from '@mui/material';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export interface DFOSelectProps {
  options: string[];
  field: ControllerRenderProps<FieldValues, string>;
}

const DFOStyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-input': {
    border: `2px solid ${theme.palette.indigo.main}`,
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    width: '100%'
  }
}));

export default function DFOSelect({
  options,
  field
}: DFOSelectProps): React.ReactElement {
  return (
    <Box>
      <DFOStyledSelect {...field}>
        {options.map((option) => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </DFOStyledSelect>
    </Box>
  );
}
