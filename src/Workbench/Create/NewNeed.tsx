import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '../../components/DFODialog/DFODialog';
import NewNeedForm from './NewNeedForm';

interface IProps {
  buttonText: string;
}

const NewNeed = ({ buttonText }: IProps) => {
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
        {buttonText}
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
