import React from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { INeed } from '../../../Nexus/entities/INeed';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import theme from '../../../theme';
import { FormDeleteBox } from '../../../components/DeleteFrame/FormDeleteBox';
import { FormTextButton } from '../../../components/DeleteFrame/FormTextButton';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { Box } from '@mui/material/';
import { Parentable } from '../../../models/Parentable';
import { FormCantDeleteBox } from '../../../components/DeleteFrame/FormCantDeleteBox';
import Typography from '@mui/material/Typography';
import { useSelectState } from '../SelectContext';
import DeleteFrame from '../../../components/DeleteFrame/DeleteFrame';

interface IProps {
  children: React.ReactNode;
  need: Parentable<INeed>;
  handleClose: () => void;
}

/* TODO: Needs validating */
function DeleteNeed({
  children,
  need,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { deleteNeed } = useProjectMutations();

  const { deleteMode } = useSelectState();
  const hasChildren = need.requirements.length > 0;

  if (deleteMode !== need.id) {
    return <>{children}</>;
  }

  const infoText = hasChildren
    ? `${t('cant delete this need')} ${t('need has children')}`
    : '';

  const onDelete = async () => {
    await deleteNeed(need).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted need'
      };
      dispatch(addAlert({ alert }));
      handleClose();
    });
  };

  return (
    <Box>
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

export default DeleteNeed;
