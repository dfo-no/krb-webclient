import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormButtons } from '../../../../components/Form/FormButtons';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import {
  CodeForm,
  updateCodelist,
  CodesFormSchema,
} from '../../../../api/nexus2';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { useSelectState } from './SelectContext';

interface Props {
  projectRef: string;
  codelistRef: string;
  code: CodeForm;
  handleClose: (newCode: CodeForm) => void;
  handleCancel: () => void;
}

export function EditCodeForm({
  projectRef,
  code,
  codelistRef,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const formStyles = useFormStyles();
  const { selectedCodelist } = useSelectState();

  const methods = useForm<CodeForm>({
    defaultValues: code,
    resolver: zodResolver(CodesFormSchema),
  });

  async function onSubmit(updatedeCode: CodeForm) {
    if (!!selectedCodelist?.codes) {
      const codesIndex = selectedCodelist.codes.findIndex(
        (item) => item.ref === updatedeCode.ref
      );
      selectedCodelist.codes[codesIndex] = updatedeCode;
      await updateCodelist({
        projectRef,
        codelistRef: codelistRef,
        ...selectedCodelist,
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
