import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material/';

import { Alert } from '../../../../models/Alert';
import { useSelectState } from '../SelectContext';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import {
  deleteRequirement,
  findRequirementVariants,
  RequirementVariantForm,
} from '../../../../api/nexus2';

interface Props {
  projectRef: string;
  children: React.ReactElement;
  requirementRef: string;
  handleClose: () => void;
}

// TODO Needs validating
function DeleteRequirement({
  children,
  projectRef,
  requirementRef,
  handleClose,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const { deleteCandidateId } = useSelectState();
  // const hasChildren = requirement.variants.length > 0; //TODO: Skal denne være med videre?

  const [variants, setVariants] = useState<RequirementVariantForm[]>([]);

  useEffect(() => {
    findRequirementVariants({
      projectRef,
      requirementRef,
    }).then((response) => {
      setVariants(response.data);
    });
  }, [projectRef, requirementRef]);

  const hasChildren = variants.length > 0;

  if (deleteCandidateId !== requirementRef) {
    return children;
  }

  const infoText = hasChildren
    ? `${t('Cant delete this requirement')} ${t('Requirement has children')}`
    : '';

  const onDelete = (): void => {
    deleteRequirement({ projectRef, requirementRef }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted requirement',
      };
      addAlert(alert);
      handleClose();
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <DeleteFrame
        children={children}
        canBeDeleted={!hasChildren}
        infoText={infoText}
        handleCancel={handleClose}
        onDelete={onDelete}
      />
    </Box>
  );
}

export default DeleteRequirement;
