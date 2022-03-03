import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputBase, styled } from '@mui/material';

export interface DFOSelectProps {
  options: string[];
}

const StyledDFOSelect = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    border: `2px solid ${theme.palette.indigo.main}`,
    fontSize: 16,
    padding: '10px 26px 10px 12px'
  }
}));

export default function DFOSelect({
  options
}: DFOSelectProps): React.ReactElement {
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <Select input={<StyledDFOSelect />} value={selectedItem}>
      {options.map((element: string, index: number) => (
        <MenuItem
          onClick={(e) => setSelectedItem(index)}
          key={element}
          value={index}
        >
          {element}
        </MenuItem>
      ))}
    </Select>
  );
}
