import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../common/LoaderSpinner';
import ErrorSummary from '../../Form/ErrorSummary';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IAlert } from '../../models/IAlert';
import { Parentable } from '../../models/Parentable';
import { INeed, PostNeedSchema } from '../../Nexus/entities/INeed';
import Nexus from '../../Nexus/Nexus';
import {
  useGetProjectQuery,
  usePutProjectMutation
} from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import { useSelectState } from './SelectContext';

interface IProps {
  handleClose: () => void;
}

interface IRouteParams {
  projectId: string;
}

function NewNeedForm({ handleClose }: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const nexus = Nexus.getInstance();
  const defaultValues: Parentable<INeed> =
    nexus.needService.generateDefaultNeedValues(projectId);
  const dispatch = useAppDispatch();
  const { data: project } = useGetProjectQuery(projectId);
  const { setNeedIndex } = useSelectState();

  const [putProject] = usePutProjectMutation();
  const { t } = useTranslation();

  const methods = useForm<Parentable<INeed>>({
    resolver: joiResolver(PostNeedSchema),
    defaultValues
  });

  if (!project) {
    return <LoaderSpinner />;
  }

  const onSubmit = async (post: Parentable<INeed>) => {
    const saveProject = {
      ...project,
      needs: [...project.needs, { ...post, id: uuidv4() }]
    };
    await putProject(saveProject)
      .unwrap()
      .then((result) => {
        if (result.needs.length > 0) {
          setNeedIndex(result.needs.length - 1);
        }
        const alert: IAlert = {
          id: uuidv4(),
          style: 'success',
          text: 'Successfully added new need'
        };
        dispatch(addAlert({ alert }));
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
        <TextCtrl name="title" label={t('Title')} />
        <TextCtrl name="description" label={t('Description')} />
        <Button variant="primary" type="submit">
          {t('save')}
        </Button>
        <Button variant="warning" onClick={handleClose}>
          {t('cancel')}
        </Button>
      </form>
      <ErrorSummary errors={methods.formState.errors} />
    </FormProvider>
  );
}

export default NewNeedForm;
