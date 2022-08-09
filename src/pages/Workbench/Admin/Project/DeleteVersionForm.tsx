import React, { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { v4 as uuidv4 } from 'uuid';

import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import {
  BasePublicationSchema,
  IPublication
} from '../../../../Nexus/entities/IPublication';
import { IAlert } from '../../../../models/IAlert';
import { useAppDispatch } from '../../../../store/hooks';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';

interface IProps {
  children: ReactElement;
  publication: IPublication;
  handleClose: () => void;
}

const DeleteVersionForm = ({
  children,
  publication,
  handleClose
}: IProps): ReactElement => {
  const { deleteMode } = useEditableState();
  const { deletePublication } = useProjectMutations();
  const dispatch = useAppDispatch();

  const methods = useForm<IPublication>({
    defaultValues: publication,
    resolver: joiResolver(BasePublicationSchema)
  });

  const onSubmit = async () => {
    await deletePublication(publication)
      .then(() => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'success',
          text: `successfully deleted the published version ${publication.version}`
        };
        dispatch(addAlert({ alert }));
        methods.reset();
        handleClose();
      })
      .catch(() => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'error',
          text: `failed to delete version ${publication.version}`
        };
        dispatch(addAlert({ alert }));
        methods.reset();
        handleClose();
      });
  };

  if (deleteMode !== publication.id) {
    return children;
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
};

export default DeleteVersionForm;
