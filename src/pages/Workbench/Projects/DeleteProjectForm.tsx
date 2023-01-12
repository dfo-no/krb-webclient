import { ReactElement, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  deleteProject,
  findPublications,
  ProjectForm,
  PublicationForm,
} from '../../../api/openapi-fetch';
import DeleteFrame from '../../../components/DeleteFrame/DeleteFrame';
import Nexus from '../../../Nexus/Nexus';
import UuidService from '../../../Nexus/services/UuidService';
import { Alert } from '../../../models/Alert';
import { ModelType } from '../../../Nexus/enums';
import { useEditableState } from '../../../components/EditableContext/EditableContext';
import { AlertsContainer } from '../../../components/Alert/AlertContext';

interface IProps {
  children: ReactElement;
  project: ProjectForm;
  handleClose: () => void;
}

export function DeleteProjectForm({
  children,
  project,
  handleClose,
}: IProps): ReactElement {
  const { t } = useTranslation();
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { deleteMode } = useEditableState();
  const uuidService = new UuidService();
  const [publications, setPublications] = useState<PublicationForm[]>([]);

  const methods = useForm<ProjectForm>({
    defaultValues: project,
    resolver: nexus.resolverService.resolver(ModelType.bank),
  });

  useEffect(() => {
    if (deleteMode === project.ref) {
      findPublications({ projectref: project.ref }).then((response) =>
        setPublications(response.data)
      );
    }
  }, [deleteMode, project.ref]);

  if (deleteMode !== project.ref) {
    return children;
  }

  const isPublished = publications.length > 0;

  const infoText = isPublished ? t('Project is published') : '';

  const onSubmit = (projectForm: ProjectForm): void => {
    if (projectForm.ref) {
      deleteProject({ projectRef: projectForm.ref }).then(() => {
        const alert: Alert = {
          id: uuidService.generateId(),
          style: 'success',
          text: 'Successfully deleted project',
        };
        addAlert(alert);
      });
    }
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
