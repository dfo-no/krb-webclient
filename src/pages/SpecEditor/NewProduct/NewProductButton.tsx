import React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box/Box';
import { useSpecificationState } from '../SpecificationContext';
import NewProductSelection from './NewProductSelection';
interface IProps {
  label: string;
}

export default function NewProductButton({
  label
}: IProps): React.ReactElement {
  const { openProductSelection, setOpenProductSelection } =
    useSpecificationState();
  const open = (): void => {
    setOpenProductSelection(true);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        paddingLeft: 1,
        flexDirection: 'row-reverse',
        marginRight: 0
      }}
    >
      <Button variant="primary" onClick={open}>
        {label}
      </Button>
      {openProductSelection && <NewProductSelection />}
    </Box>
  );
}
