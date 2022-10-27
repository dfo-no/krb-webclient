import React from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../../models/IAlert';
import { Parentable } from '../../../../models/Parentable';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useAppDispatch } from '../../../../store/hooks';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { INeed } from '../../../../Nexus/entities/INeed';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { useParams } from 'react-router-dom';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { Box } from '@mui/material/';
import { useSelectState } from '../SelectContext';
import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';

interface IProps {
  children: React.ReactElement;
  requirement: IRequirement;
  need: Parentable<INeed>;
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

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { deleteRequirement } = useProjectMutations();
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
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted requirement',
      };
      dispatch(addAlert({ alert }));
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
