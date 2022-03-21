import { joiResolver } from '@hookform/resolvers/joi';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import produce from 'immer';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import { IAlert } from '../../models/IAlert';
import { Parentable } from '../../models/Parentable';
import { IBank } from '../../Nexus/entities/IBank';
import {
  BaseRequirementSchema,
  IRequirement
} from '../../Nexus/entities/IRequirement';
import { usePutProjectMutation } from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import { useSelectState } from './SelectContext';

interface IProps {
  requirementIndex: number;
  needIndex: number;
  handleClose: () => void;
  project: IBank;
}

function DeleteRequirementForm({
  requirementIndex,
  needIndex,
  project,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const [putProject] = usePutProjectMutation();

  const { t } = useTranslation();
  const { setRequirementIndex } = useSelectState();

  const methods = useForm<Parentable<IRequirement>>({
    defaultValues: project.needs[needIndex].requirements[requirementIndex],
    resolver: joiResolver(BaseRequirementSchema),
    context: { needList: project.needs }
  });

  const onSubmit = async (item: Parentable<IRequirement>) => {
    // This code can possibly be moved to ProjectMutations if we don't need
    // to set needIndex or requirementIndex after save
    let rIndex = -1;
    const nextState = produce(project, (draftState) => {
      const nIndex = draftState.needs.findIndex((n) => n.id === item.needId);
      if (nIndex !== -1) {
        rIndex = draftState.needs[needIndex].requirements.findIndex(
          (r) => r.id === item.id
        );
        if (rIndex !== -1) {
          draftState.needs[needIndex].requirements.splice(rIndex, 1);
        }
      }
    });
    await putProject(nextState)
      .unwrap()
      .then((result) => {
        const nextIndex = Utils.getNextIndexAfterDelete(
          result.needs[needIndex].requirements,
          rIndex
        );
        if (nextIndex !== -1) {
          setRequirementIndex(nextIndex);
        }
        const alert: IAlert = {
          id: uuidv4(),
          style: 'success',
          text: 'Successfully deleted requirement'
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
        <Button variant="warning" type="submit">
          <DeleteIcon />
        </Button>
        <Button variant="warning" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <ErrorSummary errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
}

export default DeleteRequirementForm;
