import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material/';

import { Alert } from '../../../../models/Alert';
import { useSelectState } from '../SelectContext';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { deleteRequirementVariant } from '../../../../api/nexus2';

interface Props {
  children: React.ReactElement;
  projectRef: string;
  requirementRef: string;
  requirementVariantRef: string;

  handleClose: () => void;
}

// TODO Needs validating
export function DeleteVariant({
  children,
  projectRef,
  requirementRef,
  requirementVariantRef,
  handleClose,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { deleteCandidateId } = useSelectState();

  if (deleteCandidateId !== requirementVariantRef) {
    return children;
  }

  const onDelete = (): void => {
    deleteRequirementVariant({
      projectRef,
      requirementRef,
      requirementVariantRef,
    }).then(() => {
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
