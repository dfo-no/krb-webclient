import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IAlert } from '../../models/IAlert';
import { BaseBankSchema, IBank } from '../../Nexus/entities/IBank';
import DateService from '../../Nexus/services/DateService';
import UuidService from '../../Nexus/services/UuidService';
import { usePutProjectMutation } from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import { useEditableState } from '../Components/EditableContext';
import DeleteFrame from '../../components/DeleteFrame/DeleteFrame';

interface IProps {
  children: React.ReactElement;
  bank: IBank;
  handleClose: () => void;
}

export default function DeleteProjectForm({
  children,
  bank,
  handleClose
}: IProps): React.ReactElement {
  const [putProject] = usePutProjectMutation();
  const dispatch = useAppDispatch();
  const { deleteMode } = useEditableState();
  const uuidService = new UuidService();

  const methods = useForm<IBank>({
    defaultValues: bank,
    resolver: joiResolver(BaseBankSchema)
  });

  if (deleteMode !== bank.id) {
    return <>{children}</>;
  }

  async function onSubmit(post: IBank) {
    await putProject({ ...post, deletedDate: DateService.getNowString() }).then(
      () => {
        const alert: IAlert = {
          id: uuidService.generateId(),
          style: 'success',
          text: 'Successfully deleted project'
        };
        dispatch(addAlert({ alert }));
      }
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <DeleteFrame
          children={children}
          canBeDeleted={true}
          infoText={''}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
