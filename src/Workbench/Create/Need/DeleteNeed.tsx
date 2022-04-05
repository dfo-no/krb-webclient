import React from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { INeed } from '../../../Nexus/entities/INeed';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import theme from '../../../theme';
import { FormDeleteBox } from '../../Components/Form/FormDeleteBox';
import { FormTextButton } from '../../Components/Form/FormTextButton';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { Box } from '@mui/material/';
import { Parentable } from '../../../models/Parentable';
import { FormCantDeleteBox } from '../../Components/Form/FormCantDeleteBox';
import Typography from '@mui/material/Typography';
import { useSelectState } from '../SelectContext';

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
      {!hasChildren && (
        <FormDeleteBox>
          <FormTextButton
            hoverColor={theme.palette.errorRed.main}
            onClick={onDelete}
          >
            {t('delete')}
          </FormTextButton>
          <FormTextButton
            hoverColor={theme.palette.gray500.main}
            onClick={() => handleClose()}
            aria-label="close"
          >
            {t('cancel')}
          </FormTextButton>
          {children}
        </FormDeleteBox>
      )}
      {hasChildren && (
        <FormCantDeleteBox>
          <Typography variant="sm" sx={{ fontWeight: 'bold' }}>
            {t('cant delete this need')}
          </Typography>
          <FormTextButton
            hoverColor={theme.palette.gray500.main}
            onClick={() => handleClose()}
            aria-label="close"
          >
            {t('cancel')}
          </FormTextButton>
          {children}
        </FormCantDeleteBox>
      )}
    </Box>
  );
}

export default DeleteNeed;
