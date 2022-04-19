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
import theme from '../../../theme';
import { useEditableState } from '../../Components/EditableContext';
import { FormDeleteBox } from '../../Components/Form/FormDeleteBox';
import { FormTextButton } from '../../Components/Form/FormTextButton';
import { IRouteParams } from '../../Models/IRouteParams';
import Utils from '../../../common/Utils';
import { FormCantDeleteBox } from '../../Components/Form/FormCantDeleteBox';
import Typography from '@mui/material/Typography';

interface IProps {
  children: React.ReactNode;
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
    return <>{children}</>;
  }

  if (!project) {
    return <></>;
  }

  const isInUse = Utils.codelistUsedInVariants(codelist, project);

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
        {!isInUse && (
          <FormDeleteBox>
            <FormTextButton
              hoverColor={theme.palette.errorRed.main}
              type="submit"
              aria-label="delete"
            >
              {t('delete')}
            </FormTextButton>
            <FormTextButton
              hoverColor={theme.palette.gray400.main}
              onClick={() => handleClose(null)}
              aria-label="close"
            >
              {t('cancel')}
            </FormTextButton>
            {children}
          </FormDeleteBox>
        )}
        {isInUse && (
          <FormCantDeleteBox>
            <Typography variant="smBold" sx={{ paddingLeft: 1 }}>
              {t('cant delete this codelist')}{' '}
              {isInUse ? t('codelist has connected requirements') : ''}
            </Typography>
            <FormTextButton
              hoverColor={theme.palette.gray400.main}
              onClick={() => handleClose(null)}
              aria-label="close"
            >
              {t('cancel')}
            </FormTextButton>
            {children}
          </FormCantDeleteBox>
        )}
      </form>
    </FormProvider>
  );
}
