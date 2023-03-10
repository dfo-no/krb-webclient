import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormButtons } from '../../../../components/Form/FormButtons';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { CodeForm, codelistService } from '../../../../api/nexus2';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { CodeFormSchema } from '../../../../api/Zod';

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
  const formStyles = useFormStyles();
  const { codelist: loadedCodelist } = codelistService.useFindOneCodelist(
    projectRef,
    codelistRef
  );

  const methods = useForm<CodeForm>({
    defaultValues: codelistService.defaultCodeValues,
    resolver: zodResolver(CodeFormSchema),
  });

  async function onSubmit(newCode: CodeForm) {
    const newCodeList = loadedCodelist;
    if (!!newCodeList) {
      newCodeList.codes?.push(newCode);
      await codelistService
        .updateCodelist({
          projectRef,
          codelistRef: newCodeList.ref,
          ...newCodeList,
        })
        .then(() => {
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
