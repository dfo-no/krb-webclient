import { Box, Button } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { DevTool } from '@hookform/devtools';

import LoaderSpinner from '../../../../common/LoaderSpinner';
import Nexus from '../../../../Nexus/Nexus';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { Alert } from '../../../../models/Alert';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { StandardContainer } from '../../../../components/StandardContainer/StandardContainer';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import {
  findOneProject,
  ProjectForm,
  ProjectSchema,
  updateProject,
} from '../../../../api/nexus2';
import ErrorSummary from '../../../../Form/ErrorSummary';

function PropertiesPage(): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const formStyles = useFormStyles();
  const { projectId: projectRef } = useParams<IRouteProjectParams>();

  const methods = useForm<ProjectForm>({
    resolver: zodResolver(ProjectSchema),
  });

  useEffect(() => {
    findOneProject({
      projectRef,
    }).then((response) => {
      methods.reset(response.data);
    });
  }, [methods, projectRef]);

  const onSubmit = async (updatedProject: ProjectForm) => {
    await updateProject({
      projectRef,
      ...updatedProject,
    }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully updated project',
      };
      addAlert(alert);
    });
  };

  return (
    <StandardContainer>
      <FormProvider {...methods}>
        <form
          className={formStyles.singlePageForm}
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <VerticalTextCtrl
              name="title"
              label={t('Title')}
              placeholder={t('Title')}
              autoFocus
            />
            <VerticalTextCtrl
              name="description"
              label={t('Description')}
              placeholder={t('Description')}
            />
            <Button
              variant="save"
              type="submit"
              aria-label="save"
              sx={{ marginLeft: 'auto' }}
            >
              {t('Save')}
            </Button>
          </Box>
          <ErrorSummary errors={methods.formState.errors} />
        </form>
      </FormProvider>
    </StandardContainer>
  );
}

export default PropertiesPage;
