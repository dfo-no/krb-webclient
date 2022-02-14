import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import RadioCtrl from '../../FormProvider/RadioCtrl';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IAlert } from '../../models/IAlert';
import ModelType from '../../models/ModelType';
import RequirementType from '../../models/RequirementType';
import {
  IRequirement,
  PostRequirementSchema
} from '../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  addRequirementToNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';
import { useSelectState } from './SelectContext';

interface IProps {
  handleClose: () => void;
}

function NewRequirementForm({ handleClose }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();

  // need is never empty here, because otherwise this form would not be visible to the user
  const { need } = useSelectState();

  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();

  const defaultValues: IRequirement = {
    id: '',
    title: '',
    description: '',
    needId: need?.id ? need.id : '',
    tags: [],
    variants: [],
    type: ModelType.requirement,
    requirement_Type: RequirementType.requirement,
    sourceOriginal: project.id,
    sourceRel: null
  };

  const methods = useForm<IRequirement>({
    resolver: joiResolver(PostRequirementSchema),
    defaultValues
  });

  const onNewRequirementSubmit = (post: IRequirement) => {
    const requirement = { ...post };
    requirement.id = uuidv4();
    dispatch(
      addRequirementToNeed({
        needId: post.needId,
        requirement
      })
    );

    dispatch(putSelectedProjectThunk('dummy')).then(() => {
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
        onSubmit={methods.handleSubmit(onNewRequirementSubmit)}
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
