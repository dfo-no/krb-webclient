import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
import theme from '../../../theme';
import { useEditableState } from '../../Components/EditableContext';
import { FormDeleteBox } from '../../Components/Form/FormDeleteBox';
import { FormTextButton } from '../../Components/Form/FormTextButton';
import { IRouteParams } from '../../Models/IRouteParams';

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
  const { t } = useTranslation();
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
      </form>
    </FormProvider>
  );
}
