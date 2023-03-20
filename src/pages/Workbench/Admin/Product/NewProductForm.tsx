import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';

import { FormButtons } from '../../../../components/Form/FormButtons';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { RefAndParentable } from '../../../../common/Utils';
import {
  createProduct,
  ProductForm,
  ProductSchema,
} from '../../../../api/nexus2';

interface Props {
  projectRef: string;

  handleClose: () => void;
}

export default function NewProductForm({
  projectRef,
  handleClose,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const formStyles = useFormStyles();

  const methods = useForm<ProductForm>({
    defaultValues: {
      ref: uuidv4(),
      title: '',
      description: '',
    },
    resolver: zodResolver(ProductSchema),
  });

  async function onSubmit(newProduct: ProductForm) {
    await createProduct({
      projectRef,
      ...newProduct,
    }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created product',
      };
      addAlert(alert);
      handleClose();
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
          <FormButtons handleCancel={() => handleClose()} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
