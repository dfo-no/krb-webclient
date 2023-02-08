import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';

import Dialog from '../../../../components/DFODialog/DFODialog';
import EditRequirementForm from './EditRequirementForm';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { INeed } from '../../../../Nexus/entities/INeed';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { Parentable } from '../../../../models/Parentable';
import { useSelectState } from '../SelectContext';

interface Props {
  requirement: IRequirement;
  need: Parentable<INeed>;
}

const EditRequirement = ({ requirement, need }: Props) => {
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
            requirement={requirement}
            need={need}
            handleClose={onClose}
          />
        }
      />
    </>
  );
};

export default EditRequirement;
