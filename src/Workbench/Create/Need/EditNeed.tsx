import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import Dialog from '../../../components/DFODialog/DFODialog';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import EditNeedForm from './EditNeedForm';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import { useSelectState } from '../SelectContext';
import { useTranslation } from 'react-i18next';

interface IProps {
  need: Parentable<INeed>;
}

const EditNeed = ({ need }: IProps) => {
  const { t } = useTranslation();
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
        sx={{ marginLeft: 'auto', paddingRight: 2 }}
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
