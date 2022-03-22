import React from 'react';
import { Parentable } from '../../../models/Parentable';
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
import { BaseCodeSchema, ICode } from '../../../Nexus/entities/ICode';
import { ICodelist } from '../../../Nexus/entities/ICodelist';

interface IProps {
  child: React.ReactElement;
  codelist: ICodelist;
  code: Parentable<ICode>;
  handleClose: (code: Parentable<ICode> | null) => void;
}

export default function DeleteCodeForm({
  child,
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
    return <>{child}</>;
  }

  if (!project) {
    return <></>;
  }

  async function onSubmit(put: Parentable<ICode>) {
    await deleteCode(put, codelist).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted code'
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
