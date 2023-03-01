import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { FormButtons } from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { CodeForm, updateCode } from '../../../../api/nexus2';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { ModelType } from '../../../../Nexus/enums';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';

interface Props {
  projectRef: string;
  codelistRef: string;
  code: CodeForm;
  handleClose: (newCode: CodeForm) => void;
  handleCancel: () => void;
}

export function EditCodeForm({
  projectRef,
  codelistRef,
  code,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const formStyles = useFormStyles();

  const methods = useForm<CodeForm>({
    defaultValues: code,
    resolver: nexus.resolverService.resolver(ModelType.code),
  });

  async function onSubmit(updatedeCode: CodeForm) {
    await updateCode({
      projectRef,
      codelistRef,
      codeRef: updatedeCode.ref,
      ...updatedeCode,
    }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited code',
      };
      addAlert(alert);
      handleClose(updatedeCode);
    });
  }

  return (
    <FormContainerBox sx={{ marginBottom: 1 }}>
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
            <FormButtons handleCancel={handleCancel} />
          </FormItemBox>
        </form>
      </FormProvider>
    </FormContainerBox>
  );
}
