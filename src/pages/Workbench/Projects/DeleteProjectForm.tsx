import React, { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DeleteFrame from '../../../components/DeleteFrame/DeleteFrame';
import Nexus from '../../../Nexus/Nexus';
import useProjectMutations from '../../../store/api/ProjectMutations';
import UuidService from '../../../Nexus/services/UuidService';
import { IBank } from '../../../Nexus/entities/IBank';
import { IAlert } from '../../../models/IAlert';
import { ModelType } from '../../../Nexus/enums';
import { useEditableState } from '../../../components/EditableContext/EditableContext';
import { AlertsContainer } from '../../../components/Alert/AlertContext';

interface IProps {
  children: ReactElement;
  bank: IBank;
  handleClose: () => void;
}

export default function DeleteProjectForm({
  children,
  bank,
  handleClose,
}: IProps): ReactElement {
  const { t } = useTranslation();
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { deleteProject } = useProjectMutations();
  const { deleteMode } = useEditableState();
  const uuidService = new UuidService();

  const methods = useForm<IBank>({
    defaultValues: bank,
    resolver: nexus.resolverService.resolver(ModelType.bank),
  });

  if (deleteMode !== bank.id) {
    return children;
  }

  const isPublished = bank.publications.length > 0;

  const infoText = isPublished ? t('Project is published') : '';

  const onSubmit = (post: IBank): void => {
    deleteProject(post).then(() => {
      const alert: IAlert = {
        id: uuidService.generateId(),
        style: 'success',
        text: 'Successfully deleted project',
      };
      addAlert(alert);
    });
  };

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
          infoText={infoText}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
