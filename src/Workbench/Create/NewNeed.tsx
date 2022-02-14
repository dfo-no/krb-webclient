import Box from '@material-ui/core/Box/Box';
import { Button } from '@mui/material';
import { useState } from 'react';
import Dialog from '../../components/DFODialog/DFODialog';
import NewNeedForm from './NewNeedForm';

const NewNeed = () => {
  const [isNewOpen, setNewOpen] = useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        m: 1,
        flexDirection: 'row-reverse'
      }}
    >
      <Button variant="primary" onClick={() => setNewOpen(true)}>
        Legg til nytt behov
      </Button>
      <Dialog
        title="Nytt behov til kravet"
        isOpen={isNewOpen}
        handleClose={() => setNewOpen(false)}
        children={<NewNeedForm handleClose={() => setNewOpen(false)} />}
      />
    </Box>
  );
};

export default NewNeed;
