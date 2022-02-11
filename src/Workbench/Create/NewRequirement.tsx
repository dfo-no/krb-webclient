import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import { useState } from 'react';
import Dialog from '../../components/DFODialog/DFODialog';
import NewRequirementForm from './NewRequirementForm';

const NewRequirement = () => {
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
        Legg til nytt krav
      </Button>
      <Dialog
        title="Nytt behov til kravet"
        isOpen={isNewOpen}
        handleClose={() => setNewOpen(false)}
        children={<NewRequirementForm handleClose={() => setNewOpen(false)} />}
      />
    </Box>
  );
};

export default NewRequirement;
