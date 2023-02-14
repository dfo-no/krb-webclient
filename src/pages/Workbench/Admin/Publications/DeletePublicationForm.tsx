import React, { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { IPublication } from '../../../../Nexus/entities/IPublication';
import { Alert } from '../../../../models/Alert';
import { ModelType } from '../../../../Nexus/enums';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { useGetBankQuery } from '../../../../store/api/bankApi';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  children: ReactElement;
  publication: IPublication;
  handleClose: () => void;
}

const DeletePublicationForm = ({
  children,
  publication,
  handleClose,
}: Props): ReactElement => {
  const { deleteCandidateId } = useEditableState();
  const { deletePublication } = useProjectMutations();
  const { data: publicationBank } = useGetBankQuery(publication.id, {
    skip: deleteCandidateId !== publication.id,
  });
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();

  const methods = useForm<IPublication>({
    defaultValues: publication,
    resolver: nexus.resolverService.resolver(ModelType.publication),
  });

  const onSubmit = async (): Promise<void> => {
    await deletePublication(publication, publicationBank)
      .then(() => {
        const alert: Alert = {
          id: uuidv4(),
          style: 'success',
          text: `successfully deleted the published version ${publication.version}`,
        };
        addAlert(alert);
        methods.reset();
        handleClose();
      })
      .catch(() => {
        const alert: Alert = {
          id: uuidv4(),
          style: 'error',
          text: `failed to delete version ${publication.version}`,
        };
        addAlert(alert);
        methods.reset();
        handleClose();
      });
  };

  if (deleteCandidateId !== publication.id) {
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
          handleCancel={handleClose}
        />
      </form>
    </FormProvider>
  );
};

export default DeletePublicationForm;
