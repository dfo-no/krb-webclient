import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputBase, styled } from '@mui/material';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export interface DFOSelectProps {
  options: string[];
}

const DFOSelectInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    backgroundColor: theme.palette.dfoWhite.main,
    border: `2px solid ${theme.palette.indigo.main}`,
    padding: '10px 26px 10px 12px'
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
