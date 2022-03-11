import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../../common/LoaderSpinner';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { IAlert } from '../../../models/IAlert';
import { PutProjectSchema } from '../../../models/Project';
import { IBank } from '../../../Nexus/entities/IBank';
import {
  useGetProjectQuery,
  usePutProjectMutation
} from '../../../store/api/bankApi';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { StandardContainer } from '../../Components/StandardContainer';
import { IRouteParams } from '../../Models/IRouteParams';
import ProjectHeader from '../Project/ProjectHeader';

function PropertiesPage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteParams>();
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
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <StandardContainer>
          <Card>
            <DFOCardHeader>
              <ProjectHeader />
            </DFOCardHeader>

            <CardContent>
              <TextCtrl name="title" placeholder={t('Title')} />
              <TextCtrl name="description" placeholder={t('Description')} />
            </CardContent>
            <CardActions>
              <Button variant="primary" type="submit" aria-label="save">
                {t('Save')}
              </Button>
            </CardActions>
          </Card>
        </StandardContainer>
      </form>
    </FormProvider>
  );
}

export default PropertiesPage;
