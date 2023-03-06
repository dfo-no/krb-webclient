import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

import { FormButtons } from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { CodelistForm, createCodelist } from '../../../../api/nexus2';
import { Alert } from '../../../../models/Alert';
import { ModelType } from '../../../../Nexus/enums';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  projectRef: string;
  handleClose: (newCodelist: CodelistForm) => void;
  handleCancel: () => void;
}

export default function NewCodelistForm({
  projectRef,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const formStyles = useFormStyles();

  const methods = useForm<CodelistForm>({
    resolver: nexus.resolverService.postResolver(ModelType.codelist),
    defaultValues: {
      title: '',
      description: '',
      codes: [],
      ref: uuidv4(),
    },
  });

  async function onSubmit(newCodelist: CodelistForm) {
    await createCodelist({ projectRef, ...newCodelist }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created codelist',
      };
      addAlert(alert);
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
  );
}
