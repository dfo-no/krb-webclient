import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Button } from '@mui/material/';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../../../common/LoaderSpinner';
import { IAlert } from '../../../../models/IAlert';
import { PutProjectSchema } from '../../../../models/Project';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { IBank } from '../../../../Nexus/entities/IBank';
import {
  useGetProjectQuery,
  usePutProjectMutation
} from '../../../../store/api/bankApi';
import { useAppDispatch } from '../../../../store/hooks';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { StandardContainer } from '../../../../components/StandardContainer/StandardContainer';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';

function PropertiesPage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const formStyles = useFormStyles();
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);
  const [putProject] = usePutProjectMutation();

  const methods = useForm<IBank>({
    resolver: joiResolver(PutProjectSchema),
    defaultValues: project
  });

  const onSubmit = async (put: IBank) => {
    await putProject(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully updated project'
      };
      dispatch(addAlert({ alert }));
    });
  };

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
    return <></>;
  }

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
        </form>
      </FormProvider>
    </StandardContainer>
  );
}

export default PropertiesPage;
