import { ReactElement, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  deleteProject,
  findPublications,
  ProjectForm,
  PublicationForm,
  ProjectSchema,
} from '../../../api/nexus2';
import UuidService from '../../../Nexus/services/UuidService';
import { DeleteFrame } from '../../../components/DeleteFrame/DeleteFrame';
import { Alert } from '../../../models/Alert';
import { useEditableState } from '../../../components/EditableContext/EditableContext';
import { AlertsContainer } from '../../../components/Alert/AlertContext';
import ErrorSummary from '../../../Form/ErrorSummary';

interface Props {
  children: ReactElement;
  project: ProjectForm;
  handleClose: () => void;
}

export function DeleteProjectForm({
  children,
  project,
  handleClose,
}: Props): ReactElement {
  const { t } = useTranslation();
  const { addAlert } = AlertsContainer.useContainer();
  const { deleteCandidateId } = useEditableState();
  const uuidService = new UuidService();
  const [publications, setPublications] = useState<PublicationForm[]>([]);

  const methods = useForm<ProjectForm>({
    defaultValues: project,
    resolver: zodResolver(ProjectSchema),
  });

  useEffect(() => {
    if (deleteCandidateId === project.ref) {
      findPublications({ projectref: project.ref }).then((response) =>
        setPublications(response.data)
      );
    }
  }, [deleteCandidateId, project.ref]);

  if (deleteCandidateId !== project.ref) {
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
          handleCancel={handleClose}
        />
        <ErrorSummary errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
}
