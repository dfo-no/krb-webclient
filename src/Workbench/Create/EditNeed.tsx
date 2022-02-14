import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Dialog from '../../components/DFODialog/DFODialog';
import { INeed } from '../../Nexus/entities/INeed';
import EditNeedForm from './EditNeedForm';

interface IProps {
  need: INeed;
}

const EditNeed = ({ need }: IProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="edit"
      >
        <EditIcon />
      </IconButton>
      <Dialog
        title="Rediger behovet"
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={
          <EditNeedForm element={need} handleClose={() => setOpen(false)} />
        }
      />
    </>
  );
};

export default EditNeed;
