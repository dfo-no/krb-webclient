import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormButtons } from '../../../../components/Form/FormButtons';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { Alert } from '../../../../models/Alert';
import {
  CodelistForm,
  CodelistFormSchema,
  updateCodelist,
} from '../../../../api/nexus2';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';

interface Props {
  projectRef: string;
  codelist: CodelistForm;
  handleClose: (newCodelist: CodelistForm) => void;
  handleCancel: () => void;
}

export function EditCodelistForm({
  projectRef,
  codelist,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const formStyles = useFormStyles();

  const methods = useForm<CodelistForm>({
    defaultValues: codelist,
    resolver: zodResolver(CodelistFormSchema),
  });

  async function onSubmit(updatedCodelist: CodelistForm) {
    await updateCodelist({
      projectRef,
      codelistRef: codelist.ref,
      ...updatedCodelist,
    }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited codelist',
      };
      addAlert(alert);
      handleClose(updatedCodelist);
    });
  }

  return (
    <FormContainerBox sx={{ marginBottom: 1 }} key={codelist.ref}>
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
