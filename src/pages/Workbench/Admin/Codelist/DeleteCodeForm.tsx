import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';
import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { Alert } from '../../../../models/Alert';
import { ICode } from '../../../../Nexus/entities/ICode';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  children: React.ReactElement;
  codelist: ICodelist;
  code: Parentable<ICode>;
  handleClose: (code: Parentable<ICode> | null) => void;
}

export default function DeleteCodeForm({
  children,
  codelist,
  code,
  handleClose,
}: Props): React.ReactElement {
  const { deleteCode } = useProjectMutations();
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { deleteMode } = useEditableState();

  const methods = useForm<Parentable<ICode>>({
    defaultValues: code,
    resolver: nexus.resolverService.resolver(ModelType.code),
  });

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (deleteMode !== code.id) {
    return children;
  }

  if (!project) {
    return <></>;
  }

  const onSubmit = (post: Parentable<ICode>): void => {
    deleteCode(post, codelist).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted code',
      };
      addAlert(alert);
      handleClose(post);
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
          infoText={''}
          handleClose={() => handleClose(null)}
        />
      </form>
    </FormProvider>
  );
}
