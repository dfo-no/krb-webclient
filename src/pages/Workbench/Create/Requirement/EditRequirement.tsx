import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';

import Dialog from '../../../../components/DFODialog/DFODialog';
import EditRequirementForm from './EditRequirementForm';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { useSelectState } from '../SelectContext';
import { RequirementForm } from '../../../../api/nexus2';

interface Props {
  projectRef: string;
  needRef: string;
  requirement: RequirementForm;
}

export const EditRequirement = ({
  projectRef,
  needRef,
  requirement,
}: Props) => {
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
      <FormIconButton
        sx={{ alignSelf: 'baseline', marginLeft: 'auto' }}
        onClick={handleOpen}
      >
        <EditIcon />
      </FormIconButton>
      <Dialog
        isOpen={isEditOpen}
        handleClose={() => setEditOpen(false)}
        children={
          <EditRequirementForm
            projectRef={projectRef}
            needRef={needRef}
            requirement={requirement}
            handleClose={onClose}
          />
        }
      />
    </>
  );
};
