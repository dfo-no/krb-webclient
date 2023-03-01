import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { FormButtons } from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { Alert } from '../../../../models/Alert';
import { CodelistForm, updateCodelist } from '../../../../api/nexus2';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { ModelType } from '../../../../Nexus/enums';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';

interface Props {
  projectRef: string;
  codelist: CodelistForm;
  key: string;
  handleClose: (newCodelist: CodelistForm) => void;
  handleCancel: () => void;
}

export function EditCodelistForm({
  projectRef,
  codelist,
  key,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const formStyles = useFormStyles();

  const methods = useForm<CodelistForm>({
    defaultValues: codelist,
    resolver: nexus.resolverService.resolver(ModelType.codelist),
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
          key={key}
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
