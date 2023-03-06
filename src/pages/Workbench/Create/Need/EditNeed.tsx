import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';

import Dialog from '../../../../components/DFODialog/DFODialog';
import EditNeedForm from './EditNeedForm';
import { DFOCardHeaderIconButton } from '../../../../components/DFOCard/DFOCardHeaderIconButton';
import { useSelectState } from '../SelectContext';
import { NeedForm } from '../../../../api/nexus2';

interface Props {
  projectRef: string;
  need: NeedForm;
}

export const EditNeed = ({ projectRef, need }: Props) => {
  const [isEditOpen, setEditOpen] = useState(false);
  const { setDeleteCandidateId } = useSelectState();

  const handleOpen = () => {
    setEditOpen(true);
    setDeleteCandidateId('');
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
          paddingRight: 'var(--small-gap)',
        }}
        onClick={handleOpen}
      >
        <EditIcon />
      </DFOCardHeaderIconButton>
      <Dialog
        isOpen={isEditOpen}
        handleClose={onClose}
        children={
          <EditNeedForm
            projectRef={projectRef}
            need={need}
            handleClose={onClose}
            handleCancel={onClose}
          />
        }
      />
    </>
  );
};
