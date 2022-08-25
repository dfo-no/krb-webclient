import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

import FormButtons from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { IAlert } from '../../../../models/IAlert';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ModelType } from '../../../../Nexus/enums';
import { useAppDispatch } from '../../../../store/hooks';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { useParams } from 'react-router-dom';

interface IProps {
  handleClose: (newCodelist: ICodelist | null) => void;
}

export default function NewCodelistForm({
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const formStyles = useFormStyles();
  const { projectId } = useParams<IRouteProjectParams>();
  const { addCodelist } = useProjectMutations();

  const defaultValues: ICodelist =
    nexus.codelistService.generateDefaultCodelistValues(projectId);

  const methods = useForm<ICodelist>({
    resolver: nexus.resolverService.postResolver(ModelType.codelist),
    defaultValues
  });

  async function onSubmit(post: ICodelist) {
    const newCodelist = nexus.codelistService.createCodelistWithId(post);
    await addCodelist(newCodelist).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created codelist'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
      handleClose(newCodelist);
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
