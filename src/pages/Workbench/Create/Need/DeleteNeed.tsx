import { useTranslation } from 'react-i18next';
// import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material/';

// import { Alert } from '../../../../models/Alert';
import { useSelectState } from '../SelectContext';
import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';
// import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { NeedForm } from '../../../../api/nexus2';

interface Props {
  children: React.ReactElement;
  need: NeedForm;
  canBeDeleted: boolean;
  handleClose: () => void;
}

// TODO Needs validating
export function DeleteNeed({
  children,
  need,
  canBeDeleted,
  handleClose,
}: Props): React.ReactElement {
  // const { addAlert } = AlertsContainer.useContainer();

  const { t } = useTranslation();

  const { deleteMode } = useSelectState();

  if (deleteMode !== need.ref) {
    return children;
  }

  const infoText = canBeDeleted
    ? `${t('Cant delete this need')} ${t('Need has children')}`
    : '';

  const onDelete = (): void => {
    // TODO: Uncomment
    // deleteNeed(need).then(() => {
    //   const alert: Alert = {
    //     id: uuidv4(),
    //     style: 'success',
    //     text: 'Successfully deleted need',
    //   };
    //   addAlert(alert);
    //   handleClose();
    // });
  };

  return (
    <Box>
      <DeleteFrame
        children={children}
        canBeDeleted={canBeDeleted}
        infoText={infoText}
        handleClose={handleClose}
        onDelete={onDelete}
      />
    </Box>
  );
}

export default DeleteNeed;
