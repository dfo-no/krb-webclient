import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';

import Dialog from '../../../../components/DFODialog/DFODialog';
import EditNeedForm from './EditNeedForm';
import { DFOCardHeaderIconButton } from '../../../../components/DFOCard/DFOCardHeaderIconButton';
import { INeed } from '../../../../Nexus/entities/INeed';
import { Parentable } from '../../../../models/Parentable';
import { useSelectState } from '../SelectContext';

interface IProps {
  need: Parentable<INeed>;
}

const EditNeed = ({ need }: IProps) => {
  const [isEditOpen, setEditOpen] = useState(false);
  const { setDeleteMode } = useSelectState();

  const handleOpen = () => {
    setEditOpen(true);
    setDeleteMode('');
  };

  const onClose = () => {
    setEditOpen(false);
  };

  return (
    <>
      <DFOCardHeaderIconButton
        sx={{
          alignSelf: 'baseline',
          marginLeft: 'auto',
          paddingRight: 'var(--small-gap)'
        }}
        onClick={handleOpen}
      >
        <EditIcon />
      </DFOCardHeaderIconButton>
      <Dialog
        isOpen={isEditOpen}
        handleClose={onClose}
        children={<EditNeedForm need={need} handleClose={onClose} />}
      />
    </>
  );
};

export default EditNeed;
