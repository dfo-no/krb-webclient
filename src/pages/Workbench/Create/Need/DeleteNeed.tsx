import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material/';

import { Alert } from '../../../../models/Alert';
import { INeed } from '../../../../Nexus/entities/INeed';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { Parentable } from '../../../../models/Parentable';
import { useSelectState } from '../SelectContext';
import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  children: React.ReactElement;
  need: Parentable<INeed>;
  handleClose: () => void;
}

// TODO Needs validating
function DeleteNeed({
  children,
  need,
  handleClose,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();

  const { t } = useTranslation();
  const { deleteNeed } = useProjectMutations();

  const { deleteCandidateId } = useSelectState();
  const hasChildren = need.requirements.length > 0;

  if (deleteCandidateId !== need.id) {
    return children;
  }

  const infoText = hasChildren
    ? `${t('Cant delete this need')} ${t('Need has children')}`
    : '';

  const onDelete = (): void => {
    deleteNeed(need).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted need',
      };
      addAlert(alert);
      handleClose();
    });
  };

  return (
    <Box>
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

export default DeleteNeed;
