import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../common/LoaderSpinner';
import ErrorSummary from '../../Form/ErrorSummary';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IAlert } from '../../models/IAlert';
import { Parentable } from '../../models/Parentable';
import { IBank } from '../../Nexus/entities/IBank';
import { INeed, PostNeedSchema } from '../../Nexus/entities/INeed';
import Nexus from '../../Nexus/Nexus';
import { usePutProjectMutation } from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import { useSelectState } from './SelectContext';

interface IProps {
  project: IBank;
  handleClose: () => void;
}

function NewNeedForm({ project, handleClose }: IProps): React.ReactElement {
  const nexus = Nexus.getInstance();
  const defaultValues: Parentable<INeed> =
    nexus.needService.generateDefaultNeedValues(project.id);
  const dispatch = useAppDispatch();
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
    const newId = uuidv4();
    const saveProject = {
      ...project,
      needs: [...project.needs, { ...post, id: newId }]
    };
    await putProject(saveProject)
      .unwrap()
      .then((result) => {
        // set sidebar selected to the new
        const newIndex = result.needs.findIndex((n) => n.id === newId);
        if (newIndex !== -1) {
          setNeedIndex(newIndex);
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
