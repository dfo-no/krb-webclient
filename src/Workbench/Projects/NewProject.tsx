import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '../../components/DFODialog/DFODialog';
import NewProjectForm from './NewProjectForm';

const NewProject = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        m: 1,
        flexDirection: 'row-reverse'
      }}
    >
      <Button variant="primary" onClick={() => setOpen(true)}>
        Nytt prosjekt
      </Button>
      <Dialog
        title="Nytt prosjekt"
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={<NewProjectForm handleClose={() => setOpen(false)} />}
      />
    </Box>
  );
};

export default NewProject;
