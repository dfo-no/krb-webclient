import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material/';

import { Alert } from '../../../../models/Alert';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import {
  Need,
  Requirement,
  RequirementVariant,
} from '../../../../api/openapi-fetch';
import { useProjectMutationState } from '../../../../store/api/ProjectMutations';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { useSelectState } from '../SelectContext';
import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface IProps {
  children: React.ReactElement;
  variant: RequirementVariant;
  requirement: Requirement;
  need: Need;
  handleClose: () => void;
}

// TODO Needs validating
function DeleteVariant({
  children,
  variant,
  requirement,
  need,
  handleClose,
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  const { addAlert } = AlertsContainer.useContainer();
  const { deleteVariant } = useProjectMutationState();
  const { deleteMode } = useSelectState();

  if (deleteMode !== variant.ref) {
    return children;
  }

  if (!project) {
    return <></>;
  }

  const onDelete = (): void => {
    deleteVariant(variant, requirement, need).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted variant',
      };
      addAlert(alert);
      handleClose();
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <DeleteFrame
        children={children}
        canBeDeleted={true}
        infoText={''}
        handleClose={handleClose}
        onDelete={onDelete}
      />
    </Box>
  );
}

export default DeleteVariant;
