import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormButtons } from '../../../../components/Form/FormButtons';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { CodelistForm, codelistService } from '../../../../api/nexus2';
import { Alert } from '../../../../models/Alert';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import ErrorSummary from '../../../../Form/ErrorSummary';
import { CodelistFormSchema } from '../../../../api/Zod';
import { useSelectState } from './SelectContext';

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
  const formStyles = useFormStyles();
  const { filteredCodelists, setFilteredCodelists } = useSelectState();

  const methods = useForm<CodelistForm>({
    resolver: zodResolver(CodelistFormSchema),
    defaultValues: codelistService.defaultCodeValues,
  });

  async function onSubmit(newCodelist: CodelistForm) {
    await codelistService
      .createCodelist({ projectRef, ...newCodelist })
      .then(() => {
        const alert: Alert = {
          id: uuidv4(),
          style: 'success',
          text: 'Successfully created codelist',
        };
        addAlert(alert);
        filteredCodelists.push(newCodelist);
        setFilteredCodelists(filteredCodelists);
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
        <ErrorSummary errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
}
