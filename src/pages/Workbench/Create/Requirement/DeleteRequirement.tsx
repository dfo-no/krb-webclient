import { useTranslation } from 'react-i18next';
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
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
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
}: Props): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const { deleteRequirement } = useProjectMutations();
  const { deleteCandidateId } = useSelectState();
  const hasChildren = requirement.variants.length > 0;

  if (!project) {
    return <></>;
  }

  if (deleteCandidateId !== requirement.id) {
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
