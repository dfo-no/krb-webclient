import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { BaseCodeSchema, ICode } from '../../../Nexus/entities/ICode';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { useEditableState } from '../../Components/EditableContext';
import { IRouteParams } from '../../Models/IRouteParams';
import DeleteFrame from '../../../components/DeleteFrame/DeleteFrame';

interface IProps {
  children: React.ReactNode;
  codelist: ICodelist;
  code: Parentable<ICode>;
  handleClose: (code: Parentable<ICode> | null) => void;
}

export default function DeleteCodeForm({
  children,
  codelist,
  code,
  handleClose
}: IProps): React.ReactElement {
  const { deleteCode } = useProjectMutations();
  const dispatch = useAppDispatch();
  const { deleteMode } = useEditableState();

  const methods = useForm<Parentable<ICode>>({
    defaultValues: code,
    resolver: joiResolver(BaseCodeSchema)
  });

  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (deleteMode !== code.id) {
    return <>{children}</>;
  }

  if (!project) {
    return <></>;
  }

  async function onSubmit(post: Parentable<ICode>) {
    await deleteCode(post, codelist).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted code'
      };
      dispatch(addAlert({ alert }));
      handleClose(post);
    });
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
          handleClose={() => handleClose(null)}
        />
      </form>
    </FormProvider>
  );
}
