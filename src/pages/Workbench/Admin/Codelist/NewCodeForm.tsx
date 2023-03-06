import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { FormButtons } from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { CodeForm, createCode } from '../../../../api/nexus2';
import { ModelType } from '../../../../Nexus/enums';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';

interface Props {
  projectRef: string;
  codelistRef: string;
  handleClose: (newCode: CodeForm) => void;
  handleCancel: () => void;
}

export default function NewCodeForm({
  projectRef,
  codelistRef,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const formStyles = useFormStyles();

  const methods = useForm<CodeForm>({
    resolver: nexus.resolverService.postResolver(ModelType.code),
    defaultValues: {
      title: '',
      description: '',
      ref: uuidv4(),
    },
  });

  async function onSubmit(newCode: CodeForm) {
    await createCode({ projectRef, codelistRef, ...newCode }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created code',
      };
      addAlert(alert);
      methods.reset();
      handleClose(newCode);
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
