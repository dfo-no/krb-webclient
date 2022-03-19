import { DevTool } from '@hookform/devtools';
import { joiResolver } from '@hookform/resolvers/joi';
import { Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import produce from 'immer';
import React from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IAlert } from '../../models/IAlert';
import { IBank } from '../../Nexus/entities/IBank';
import {
  BaseRequirementSchema,
  IRequirement
} from '../../Nexus/entities/IRequirement';
import { usePutProjectMutation } from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import DeleteRequirement from './DeleteRequirement';
// import VariantsList from './VariantsList';

interface IProps {
  requirementIndex: number;
  project: IBank;
  needIndex: number;
}

const Requirement = ({ requirementIndex, needIndex, project }: IProps) => {
  // const { control } = useFormContext();

  /* const { fields, prepend, remove } = useFieldArray({
    control,
    name: `requirements.${requirementIndex}`
  }); */

  // const { t } = useTranslation();
  const [putProject] = usePutProjectMutation();
  const dispatch = useAppDispatch();

  /* const methods = useForm<IRequirement>({
    resolver: joiResolver(BaseRequirementSchema),
    defaultValues: requirement
  }); */

  const onSubmit = async (post: IRequirement) => {
    /* const nextState = produce(project, (draftState) => {
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
    }); */
  };

  return (
    <div>
      <Typography>
        {project.needs[needIndex].requirements[requirementIndex].title}
      </Typography>
      <DeleteRequirement
        needIndex={needIndex}
        requirementIndex={requirementIndex}
      />
    </div>
  );

  /* return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div>
          {requirement.tags.map((tag) => {
            return <Chip key={tag} color="primary" label={tag} />;
          })}
        </div>
        <VariantsList />
      </form>
      <DevTool control={methods.control} />
      <ErrorSummary errors={methods.formState.errors} />
    </FormProvider>
  ); */
};

export default Requirement;
