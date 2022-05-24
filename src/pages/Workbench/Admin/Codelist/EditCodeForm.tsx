import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../../models/IAlert';
import { Parentable } from '../../../../models/Parentable';
import { BaseCodeSchema, ICode } from '../../../../Nexus/entities/ICode';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { useAppDispatch } from '../../../../store/hooks';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import FormButtons from '../../../../components/Form/FormButtons';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';

interface IProps {
  codelist: ICodelist;
  code: Parentable<ICode>;
  handleClose: (newCode: Parentable<ICode> | null) => void;
}

function EditCodeForm({
  codelist,
  code,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const formStyles = useFormStyles();
  const { editCode } = useProjectMutations();

  const methods = useForm<Parentable<ICode>>({
    defaultValues: code,
    resolver: joiResolver(BaseCodeSchema)
  });

  async function onSubmit(put: Parentable<ICode>) {
    await editCode(put, codelist).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited code'
      };
      dispatch(addAlert({ alert }));
      handleClose(put);
    });
  }

  return (
    <FormProvider {...methods}>
      <form
        className={formStyles.flexGrowForm}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormItemBox>
          <VerticalTextCtrl name="title" label={t('Title')} placeholder={''} />
          <VerticalTextCtrl
            name="description"
            label={t('Description')}
            placeholder={''}
          />
          <FormButtons handleClose={() => handleClose(null)} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}

export default EditCodeForm;
