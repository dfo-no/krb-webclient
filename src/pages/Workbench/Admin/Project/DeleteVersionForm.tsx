import React, { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';

import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';
import {
  BasePublicationSchema,
  IPublication
} from '../../../../Nexus/entities/IPublication';
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

  const methods = useForm<IPublication>({
    defaultValues: publication,
    resolver: joiResolver(BasePublicationSchema)
  });

  const onSubmit = (): void => {
    console.log('SUBMIT SOFT DELETE', publication.id);
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
