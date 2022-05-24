import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../../../store/hooks';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { IAlert } from '../../../../models/IAlert';
import {
  CodelistSchema,
  ICodelist
} from '../../../../Nexus/entities/ICodelist';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import FormButtons from '../../../../components/Form/FormButtons';

interface IProps {
  codelist: ICodelist;
  handleClose: (newCodelist: ICodelist | null) => void;
}

export default function EditCodelistForm({
  codelist,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const formStyles = useFormStyles();
  const { editCodelist } = useProjectMutations();

  const methods = useForm<ICodelist>({
    defaultValues: codelist,
    resolver: joiResolver(CodelistSchema)
  });

  async function onSubmit(put: ICodelist) {
    await editCodelist(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited codelist'
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
