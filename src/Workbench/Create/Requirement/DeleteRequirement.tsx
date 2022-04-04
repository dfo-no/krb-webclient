import React from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { INeed } from '../../../Nexus/entities/INeed';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useParams } from 'react-router-dom';
import { FormDeleteBox } from '../../Components/Form/FormDeleteBox';
import { FormTextButton } from '../../Components/Form/FormTextButton';
import theme from '../../../theme';
import { IRouteParams } from '../../Models/IRouteParams';
import { Box } from '@mui/material/';
import { FormCantDeleteBox } from '../../Components/Form/FormCantDeleteBox';
import Typography from '@mui/material/Typography';
import { useSelectState } from '../SelectContext';

interface IProps {
  children: React.ReactNode;
  requirement: IRequirement;
  need: Parentable<INeed>;
  handleClose: () => void;
}

/* TODO: Needs validating */
function DeleteRequirement({
  children,
  requirement,
  need,
  handleClose
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
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
    return <>{children}</>;
  }

  const onSubmit = async () => {
    await deleteRequirement(requirement, need).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted requirement'
      };
      dispatch(addAlert({ alert }));
      handleClose();
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      {!hasChildren && (
        <FormDeleteBox>
          <FormTextButton
            hoverColor={theme.palette.errorRed.main}
            onClick={onSubmit}
            aria-label="delete"
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
          <Typography variant={'smallBold'}>
            {t('cant delete this requirement')}
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

export default DeleteRequirement;
