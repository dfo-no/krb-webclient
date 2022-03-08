import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import Dialog from '../../../components/DFODialog/DFODialog';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import EditNeedForm from './EditNeedForm';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import { useSelectState } from '../SelectContext';

interface IProps {
  need: Parentable<INeed>;
}

const EditNeed = ({ need }: IProps) => {
  const [isEditOpen, setEditOpen] = useState(false);
  const { setDeletingNeed } = useSelectState();

  const handleOpen = () => {
    setEditOpen(true);
    setDeletingNeed(false);
  };

  return (
    <>
      <DFOCardHeaderIconButton
        sx={{ marginLeft: 'auto', paddingRight: 2 }}
        onClick={handleOpen}
      >
        <EditIcon />
      </DFOCardHeaderIconButton>
      <Dialog
        title="Rediger behovet"
        isOpen={isEditOpen}
        handleClose={() => setEditOpen(false)}
        children={
          <EditNeedForm need={need} handleClose={() => setEditOpen(false)} />
        }
      />
    </>
  );
};

export default EditNeed;
