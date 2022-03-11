import { joiResolver } from '@hookform/resolvers/joi';
import Chip from '@mui/material/Chip';
import produce from 'immer';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import HorizontalTextCtrl from '../../FormProvider/HorizontalTextCtrl';
import { IAlert } from '../../models/IAlert';
import { IBank } from '../../Nexus/entities/IBank';
import {
  BaseRequirementSchema,
  IRequirement
} from '../../Nexus/entities/IRequirement';
import { usePutProjectMutation } from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import VariantsList from './VariantsList';

interface IProps {
  requirement: IRequirement;
  project: IBank;
  needIndex: number;
}

const Requirement = ({ requirement, project, needIndex }: IProps) => {
  const { t } = useTranslation();
  const [putProject] = usePutProjectMutation();
  const dispatch = useAppDispatch();

  const methods = useForm<IRequirement>({
    resolver: joiResolver(BaseRequirementSchema),
    defaultValues: requirement
  });

  const onSubmit = async (post: IRequirement) => {
    const nextState = produce(project, (draftState) => {
      const index = project.needs[needIndex].requirements.findIndex(
        (r) => r.id === post.id
      );
      if (index !== -1) {
        draftState.needs[needIndex].requirements.splice(index, 1, post);
      }
    });

    await putProject(nextState).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'successfully updated requirement'
      };
      dispatch(addAlert({ alert }));
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <HorizontalTextCtrl name="title" placeholder={t('Title')} />
        {/* TODO: replace with Custom SelectCtrl when done */}
        <div>
          {requirement.tags.map((tag) => {
            return <Chip key={tag} color="primary" label={tag} />;
          })}
        </div>
        <VariantsList />
      </form>
      <ErrorSummary errors={methods.formState.errors} />
    </FormProvider>
  );
};

export default Requirement;
