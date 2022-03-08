import { joiResolver } from '@hookform/resolvers/joi';
import Chip from '@mui/material/Chip';
import produce from 'immer';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../../Form/ErrorSummary';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { IAlert } from '../../../models/IAlert';
import { IBank } from '../../../Nexus/entities/IBank';
import {
  BaseRequirementSchema,
  IRequirement
} from '../../../Nexus/entities/IRequirement';
import { usePutProjectMutation } from '../../../store/api/bankApi';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import VariantsList from '../VariantsList';
import { Box } from '@mui/material';
import theme from '../../../theme';
import { DFOAccordionProvider } from '../../../components/DFOAccordion/DFOAccordion';

interface IProps {
  requirement: IRequirement;
}

const Requirement = ({ requirement }: IProps) => {
  const { t } = useTranslation();
  const [putProject] = usePutProjectMutation();
  const dispatch = useAppDispatch();

  const methods = useForm<IRequirement>({
    resolver: joiResolver(BaseRequirementSchema),
    defaultValues: requirement
  });

  return (
    <Box sx={{ backgroundColor: theme.palette.gray100.main }}>
      <VariantsList requirement={requirement} />
    </Box>
  );
  /*
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
        <TextCtrl name="title" label={t('Title')} />
        { TODO: replace with Custom SelectCtrl when done
        <div>
          {requirement.tags.map((tag) => {
            return <Chip key={tag} color="primary" label={tag} />;
          })}
        </div>
        <VariantsList />
      </form>
      <ErrorSummary errors={methods.formState.errors} />
    </FormProvider>
  );*/
};

export default Requirement;
