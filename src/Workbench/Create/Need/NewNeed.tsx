import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '../../../components/DFODialog/DFODialog';
import NewNeedForm from './NewNeedForm';
import { useSelectState } from '../SelectContext';

const NewNeed = () => {
  const [isNewOpen, setNewOpen] = useState(false);
  const { setDeletingNeed } = useSelectState();

  const handleClose = () => {
    setNewOpen(false);
    setDeletingNeed(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        m: 1,
        flexDirection: 'row-reverse'
      }}
    >
      <Button variant="primary" onClick={handleClose}>
        Legg til nytt behov
      </Button>
      <Dialog
        title="Nytt behov til kravet"
        isOpen={isNewOpen}
        handleClose={() => setNewOpen(false)}
        children={<NewNeedForm handleClose={handleClose} />}
      />
    </Box>
  );
};

export default NewNeed;
