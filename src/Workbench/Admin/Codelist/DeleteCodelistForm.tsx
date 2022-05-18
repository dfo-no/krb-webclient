import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { CodelistSchema, ICodelist } from '../../../Nexus/entities/ICodelist';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { useEditableState } from '../../Components/EditableContext';
import { IRouteParams } from '../../Models/IRouteParams';
import Utils from '../../../common/Utils';
import DeleteFrame from '../../../components/DeleteFrame/DeleteFrame';

interface IProps {
  children: React.ReactElement;
  codelist: ICodelist;
  handleClose: (codelist: ICodelist | null) => void;
}

export default function DeleteCodelistForm({
  children,
  codelist,
  handleClose
}: IProps): React.ReactElement {
  const { deleteCodelist } = useProjectMutations();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { deleteMode } = useEditableState();

  const methods = useForm<ICodelist>({
    defaultValues: codelist,
    resolver: joiResolver(CodelistSchema)
  });

  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (deleteMode !== codelist.id) {
    return children;
  }

  if (!project) {
    return <></>;
  }

  const isInUse = Utils.codelistUsedInVariants(codelist, project);

  const infoText = isInUse
    ? `${t('Cant delete this codelist')} ${t(
        'Codelist has connected requirements'
      )}`
    : '';

  const onSubmit = (put: ICodelist): void => {
    deleteCodelist(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted codelist'
      };
      dispatch(addAlert({ alert }));
      handleClose(put);
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
          canBeDeleted={!isInUse}
          infoText={infoText}
          handleClose={() => handleClose(null)}
        />
      </form>
    </FormProvider>
  );
}
