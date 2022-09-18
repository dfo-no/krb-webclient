import React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box/Box';
import { SPECIFICATION } from '../../../common/PathConstants';
import { useHistory } from 'react-router-dom';
import { useSpecificationState } from '../SpecificationContext';
import NewProductSelection from './NewProductSelection';
interface IProps {
  label: string;
}

export default function NewProductButton({
  label
}: IProps): React.ReactElement {
  const history = useHistory();
  const { openProductSelection, setOpenProductSelection, specification } =
    useSpecificationState();
  const open = (): void => {
    setOpenProductSelection(true);
    history.push(`/${SPECIFICATION}/${specification.id}/create/`);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        m: 1,
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
