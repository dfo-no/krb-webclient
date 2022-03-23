import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../../common/LoaderSpinner';
import HorizontalTextCtrl from '../../../FormProvider/HorizontalTextCtrl';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { IBank } from '../../../Nexus/entities/IBank';
import { INeed, PutNeedSchema } from '../../../Nexus/entities/INeed';
import {
  useGetProjectQuery,
  usePutProjectMutation
} from '../../../store/api/bankApi';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';

interface IProps {
  // element: INeed;
  handleClose: () => void;
  need: Parentable<INeed>;
}

interface IRouteParams {
  projectId: string;
}

function EditNeedForm({ need, handleClose }: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [putProject] = usePutProjectMutation();

  const methods = useForm<Parentable<INeed>>({
    defaultValues: need,
    resolver: joiResolver(PutNeedSchema)
  });

  if (!project) {
    return <LoaderSpinner />;
  }

  const onSubmit = async (post: Parentable<INeed>) => {
    const index = project.needs.findIndex((n) => n.id === post.id);
    const needs = [...project.needs];
    needs[index] = post;
    const saveProject: IBank = {
      ...project,
      needs
    };
    await putProject(saveProject).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited need'
      };
      dispatch(addAlert({ alert }));
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
        <HorizontalTextCtrl name="title" placeholder={t('Title')} />
        <HorizontalTextCtrl name="description" placeholder={t('Description')} />

        <Button variant="primary" type="submit">
          {t('save')}
        </Button>
        <Button variant="warning" onClick={handleClose}>
          {t('cancel')}
        </Button>
      </form>
    </FormProvider>
  );
}

export default EditNeedForm;
