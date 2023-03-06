import { Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import Nexus from '../../../Nexus/Nexus';
import ProjectService from '../../../Nexus/services/ProjectService';
import theme from '../../../theme';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { Alert } from '../../../models/Alert';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox,
} from '../../../components/ModalBox/ModalBox';
import { AlertsContainer } from '../../../components/Alert/AlertContext';
import { createProject, ProjectSchema } from '../../../api/nexus2';
import { ProjectForm } from '../../../api/nexus2';
import ErrorSummary from '../../../Form/ErrorSummary';

interface Props {
  handleClose: () => void;
}

const NewProjectForm = ({ handleClose }: Props) => {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  // TODO Should contain a defaultValue from options to fully control the Select
  const defaultValues = ProjectService.defaultProject();

  const methods = useForm<ProjectForm>({
    resolver: zodResolver(ProjectSchema),
    defaultValues,
  });

  const onSubmit = async (post: ProjectForm) => {
    await createProject(post).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created project',
      };
      addAlert(alert);
      methods.reset();
      handleClose();
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <ModalBox>
          <Typography variant="lg" color={theme.palette.primary.main}>
            {t('Create new project')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('What is the name of the project?')}
              placeholder={t('Name of project')}
              autoFocus
            />
            <VerticalTextCtrl
              name="description"
              label={t('Describe the project')}
              placeholder={t('short description')}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('common.Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('Create project')}
            </ModalButton>
          </ModalButtonsBox>
          <ErrorSummary errors={methods.formState.errors} />
        </ModalBox>
      </form>
    </FormProvider>
  );
};

export default NewProjectForm;
