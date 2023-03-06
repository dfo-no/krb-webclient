import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { FormButtons } from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { IProduct } from '../../../../Nexus/entities/IProduct';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  product: Parentable<IProduct>;
  handleClose: (newProduct: Parentable<IProduct>) => void;
  handleCancel: () => void;
}

export default function EditProductForm({
  product,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const formStyles = useFormStyles();
  const { editProduct } = useProjectMutations();

  const methods = useForm<Parentable<IProduct>>({
    defaultValues: product,
    resolver: nexus.resolverService.resolver(ModelType.product),
  });

  async function onSubmit(put: Parentable<IProduct>) {
    await editProduct(put).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited product',
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
          <VerticalTextCtrl name="unit" label={t('Unit')} placeholder={''} />
          <FormButtons handleCancel={handleCancel} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
