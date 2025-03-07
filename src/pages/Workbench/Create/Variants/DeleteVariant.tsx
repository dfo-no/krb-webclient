import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material/';

import { Alert } from '../../../../models/Alert';
import { Parentable } from '../../../../models/Parentable';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { INeed } from '../../../../Nexus/entities/INeed';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { useSelectState } from '../SelectContext';
import { IVariant } from '../../../../Nexus/entities/IVariant';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  children: React.ReactElement;
  variant: IVariant;
  requirement: IRequirement;
  need: Parentable<INeed>;
  handleClose: () => void;
}

// TODO Needs validating
function DeleteVariant({
  children,
  variant,
  requirement,
  need,
  handleClose,
}: Props): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  const { addAlert } = AlertsContainer.useContainer();
  const { deleteVariant } = useProjectMutations();
  const { deleteCandidateId } = useSelectState();

  if (deleteCandidateId !== variant.id) {
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
        handleCancel={handleClose}
        onDelete={onDelete}
      />
    </Box>
  );
}

export default DeleteVariant;
