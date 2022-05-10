import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import Dialog from '../../../components/DFODialog/DFODialog';
import { Parentable } from '../../../models/Parentable';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import EditRequirementForm from './EditRequirementForm';
import { useSelectState } from '../SelectContext';
import { INeed } from '../../../Nexus/entities/INeed';
import { FormIconButton } from '../../Components/Form/FormIconButton';

interface IProps {
  requirement: IRequirement;
  need: Parentable<INeed>;
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
      <FormIconButton sx={{ marginLeft: 'auto' }} onClick={handleOpen}>
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
