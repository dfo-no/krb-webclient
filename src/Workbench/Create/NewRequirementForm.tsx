import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import produce from 'immer';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../common/LoaderSpinner';
import ErrorSummary from '../../Form/ErrorSummary';
import RadioCtrl from '../../FormProvider/RadioCtrl';
import HorizontalTextCtrl from '../../FormProvider/HorizontalTextCtrl';
import { IAlert } from '../../models/IAlert';
import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';
import RequirementType from '../../models/RequirementType';
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
  const { needIndex } = useSelectState();
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
    const nextState = produce(project, (draftState) => {
      const postDraft = { ...post, id: uuidv4() };
      draftState.needs[needIndex].requirements.unshift(postDraft);
    });

    await putProject(nextState).then(() => {
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
        <RadioCtrl
          name="requirement_Type"
          label="Type"
          options={[
            { value: RequirementType.requirement, label: 'Krav' },
            { value: RequirementType.info, label: 'Info' }
          ]}
        />
        <HorizontalTextCtrl name="title" placeholder={t('Title')} />
        <HorizontalTextCtrl name="description" placeholder={t('Description')} />
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
