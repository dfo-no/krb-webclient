import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import FormButtons from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import { useProjectMutationState } from '../../../../store/api/ProjectMutations';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { ModelType } from '../../../../Nexus/enums';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { Code, Codelist } from '../../../../api/openapi-fetch';

interface IProps {
  codelist: Codelist;
  code: Code;
  handleClose: (newCode: Code | null) => void;
}

function EditCodeForm({
  codelist,
  code,
  handleClose,
}: IProps): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const formStyles = useFormStyles();
  const { editCode } = useProjectMutationState();

  const methods = useForm<Code>({
    defaultValues: code,
    resolver: nexus.resolverService.resolver(ModelType.code),
  });

  async function onSubmit(put: Code) {
    await editCode(put, codelist).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited code',
      };
      addAlert(alert);
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
          <VerticalTextCtrl
            name="title"
            label={t('Title')}
            placeholder={''}
            autoFocus
          />
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
