import React from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material/';

import { Alert } from '../../../../models/Alert';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useProjectMutationState } from '../../../../store/api/ProjectMutations';
import { Need, Requirement } from '../../../../api/openapi-fetch';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { useSelectState } from '../SelectContext';
import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface IProps {
  children: React.ReactElement;
  requirement: Requirement;
  need: Need;
  handleClose: () => void;
}

// TODO Needs validating
function DeleteRequirement({
  children,
  requirement,
  need,
  handleClose,
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const { deleteRequirement } = useProjectMutationState();
  const { deleteMode } = useSelectState();
  const hasChildren = requirement.variants.length > 0;

  if (!project) {
    return <></>;
  }

  if (deleteMode !== requirement.id) {
    return children;
  }

  const infoText = hasChildren
    ? `${t('Cant delete this requirement')} ${t('Requirement has children')}`
    : '';

  const onDelete = (): void => {
    deleteRequirement(requirement, need).then(() => {
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
        handleClose={handleClose}
        onDelete={onDelete}
      />
    </Box>
  );
}

export default DeleteRequirement;
