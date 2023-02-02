import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

import Dialog from '../../../../components/DFODialog/DFODialog';
import NewNeedForm from './NewNeedForm';
import { useSelectState } from '../SelectContext';
import { NeedForm } from '../../../../api/nexus2';

interface Props {
  needs: NeedForm[];
  buttonText: string;
}

export const NewNeed = ({ needs, buttonText }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const { setNeedIndex, setNeedId } = useSelectState();

  const onClose = (newNeed: NeedForm | null) => {
    setOpen(false);
    if (newNeed) {
      setNeedIndex(needs.length);
      setNeedId(newNeed.ref);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingBottom: 2,
      }}
    >
      <Button variant="primary" onClick={() => setOpen(true)}>
        {buttonText}
      </Button>
      <Dialog
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={<NewNeedForm handleClose={onClose} />}
      />
    </Box>
  );
};
