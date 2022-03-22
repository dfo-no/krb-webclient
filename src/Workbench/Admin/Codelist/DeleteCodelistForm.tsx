import React from 'react';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { useAppDispatch } from '../../../store/hooks';
import { FormDeleteBox } from '../../Components/Form/FormDeleteBox';
import { FormTextButton } from '../../Components/Form/FormTextButton';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { useEditableState } from '../../Components/EditableContext';
import { CodelistSchema, ICodelist } from '../../../Nexus/entities/ICodelist';

interface IProps {
  child: React.ReactElement;
  codelist: ICodelist;
  handleClose: (codelist: ICodelist | null) => void;
}

export default function DeleteCodelistForm({
  child,
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
    return <>{child}</>;
  }

  if (!project) {
    return <></>;
  }

  async function onSubmit(put: ICodelist) {
    await deleteCodelist(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted codelist'
      };
      dispatch(addAlert({ alert }));
      handleClose(put);
    });
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormDeleteBox>
          <FormTextButton
            hoverColor={theme.palette.dfoErrorRed.main}
            type="submit"
            aria-label="delete"
          >
            {t('delete')}
          </FormTextButton>
          <FormTextButton
            hoverColor={theme.palette.gray500.main}
            onClick={() => handleClose(null)}
            aria-label="close"
          >
            {t('cancel')}
          </FormTextButton>
          {child}
        </FormDeleteBox>
      </form>
    </FormProvider>
  );
}
