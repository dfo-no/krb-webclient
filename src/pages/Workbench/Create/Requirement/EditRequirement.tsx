import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';

import Dialog from '../../../../components/DFODialog/DFODialog';
import EditRequirementForm from './EditRequirementForm';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { useSelectState } from '../SelectContext';
import { Need } from '../../../../api/openapi-fetch';

interface IProps {
  requirement: IRequirement;
  need: Need;
}

const EditRequirement = ({ requirement, need }: IProps) => {
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
