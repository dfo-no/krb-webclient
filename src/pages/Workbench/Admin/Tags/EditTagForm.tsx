import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import FormButtons from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { IAlert } from '../../../../models/IAlert';
import { ITag } from '../../../../Nexus/entities/ITag';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { useAppDispatch } from '../../../../store/hooks';
import { useFormStyles } from '../../../../components/Form/FormStyles';

interface IProps {
  tag: Parentable<ITag>;
  handleClose: () => void;
}

export default function EditTagForm({
  tag,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const formStyles = useFormStyles();
  const { editTag } = useProjectMutations();

  const methods = useForm<Parentable<ITag>>({
    defaultValues: tag,
    resolver: nexus.resolverService.resolver(ModelType.tag)
  });

  async function onSubmit(put: Parentable<ITag>) {
    await editTag(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited tag'
      };
      dispatch(addAlert({ alert }));
      handleClose();
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
          <FormButtons handleClose={() => handleClose()} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
