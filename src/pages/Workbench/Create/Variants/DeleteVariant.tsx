import React from 'react';
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
import { IVariant } from '../../../../Nexus/entities/IVariant';
import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';

interface IProps {
  children: React.ReactElement;
  variant: IVariant;
  requirement: IRequirement;
  need: Parentable<INeed>;
  handleClose: () => void;
}

/* TODO: Needs validating */
function DeleteVariant({
  children,
  variant,
  requirement,
  need,
  handleClose,
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  const dispatch = useAppDispatch();
  const { deleteVariant } = useProjectMutations();
  const { deleteMode } = useSelectState();

  if (deleteMode !== variant.id) {
    return children;
  }

  if (!project) {
    return <></>;
  }

  const onDelete = (): void => {
    deleteVariant(variant, requirement, need).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted variant',
      };
      dispatch(addAlert({ alert }));
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
