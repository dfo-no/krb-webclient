import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Dialog from '../../components/DFODialog/DFODialog';
import { INeed } from '../../Nexus/entities/INeed';
import DeleteNeedForm from './DeleteNeedForm';

interface IProps {
  need: INeed;
}

const DeleteNeed = ({ need }: IProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <span>
      <IconButton
        onClick={() => setOpen(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="edit"
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        title="Slett behovet"
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={
          <DeleteNeedForm element={need} handleClose={() => setOpen(false)} />
        }
      />
    </span>
  );
};

export default DeleteNeed;
