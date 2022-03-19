import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import produce from 'immer';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../common/LoaderSpinner';
import ErrorSummary from '../../Form/ErrorSummary';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IAlert } from '../../models/IAlert';
import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';
import { IBank } from '../../Nexus/entities/IBank';
import { INeed } from '../../Nexus/entities/INeed';
import {
  IRequirement,
  PostRequirementSchema
} from '../../Nexus/entities/IRequirement';
import { usePutProjectMutation } from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import { useSelectState } from './SelectContext';

interface IProps {
  need: Parentable<INeed>;
  project: IBank;
  handleClose: () => void;
}

function NewRequirementForm({
  project,
  need,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { needIndex, setNeedIndex } = useSelectState();
  const { t } = useTranslation();
  const [putProject] = usePutProjectMutation();

  const defaultValues: IRequirement = {
    id: '',
    title: '',
    description: '',
    needId: need?.id ? need.id : '',
    tags: [],
    variants: [],
    type: ModelType.requirement,
    sourceOriginal: project.id,
    sourceRel: null
  };

  const methods = useForm<IRequirement>({
    resolver: joiResolver(PostRequirementSchema),
    defaultValues
  });

  if (needIndex === null) {
    return <LoaderSpinner />;
  }

  const onSubmit = async (post: IRequirement) => {
    const newId = uuidv4();
    const nextState = produce(project, (draftState) => {
      const postDraft = { ...post, id: newId };
      draftState.needs[needIndex].requirements.unshift(postDraft);
    });

    await putProject(nextState)
      .unwrap()
      .then((result) => {
        const newIndex = result.needs.findIndex((n) => n.id === newId);
        if (newIndex !== -1) {
          setNeedIndex(newIndex);
        }
        const alert: IAlert = {
          id: uuidv4(),
          style: 'success',
          text: 'Successfully created new requirement'
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
        <TextCtrl name="title" label={t('Title')} />
        <TextCtrl name="description" label={t('Description')} />
        <Button variant="primary" type="submit">
          {t('save')}
        </Button>
        <Button variant="warning" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <ErrorSummary errors={methods?.formState?.errors} />
      </form>
    </FormProvider>
  );
}

export default NewRequirementForm;
