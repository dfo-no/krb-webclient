import React from 'react';
import { Parentable } from '../../../../models/Parentable';
import { BaseTagSchema, ITag } from '../../../../Nexus/entities/ITag';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../../models/IAlert';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { useAppDispatch } from '../../../../store/hooks';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import Utils from '../../../../common/Utils';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';

interface IProps {
  children: React.ReactElement;
  tag: Parentable<ITag>;
  handleClose: () => void;
}

export default function DeleteTagForm({
  children,
  tag,
  handleClose
}: IProps): React.ReactElement {
  const { deleteTag } = useProjectMutations();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { deleteMode } = useEditableState();

  const methods = useForm<Parentable<ITag>>({
    defaultValues: tag,
    resolver: joiResolver(BaseTagSchema)
  });

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (deleteMode !== tag.id) {
    return children;
  }

  if (!project) {
    return <></>;
  }

  const hasChildren = Utils.checkIfHasChildren(tag, project.tags);

  const infoText = hasChildren
    ? `${t('Cant delete this tag')} ${t('Tag has children')}`
    : '';

  const onSubmit = (put: Parentable<ITag>): void => {
    deleteTag(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted tag'
      };
      dispatch(addAlert({ alert }));
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
        <DeleteFrame
          children={children}
          canBeDeleted={!hasChildren}
          infoText={infoText}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
