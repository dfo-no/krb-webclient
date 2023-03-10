import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';

import { FormButtons } from '../../../../components/Form/FormButtons';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { RefAndParentable } from '../../../../common/Utils';
import {
  ProductEditSchema,
  ProductForm,
  ProductSchema,
  updateProduct,
} from '../../../../api/nexus2';
import ErrorSummary from "../../../../Form/ErrorSummary";

interface Props {
  projectRef: string;
  product: RefAndParentable<ProductForm>;
  handleClose: (newProduct: ProductForm) => void;
  handleCancel: () => void;
}

export default function EditProductForm({
  projectRef,
  product,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const formStyles = useFormStyles();

  const methods = useForm<RefAndParentable<ProductForm>>({
    defaultValues: product,
    resolver: zodResolver(ProductEditSchema),
  });
  console.log('hello', product.ref);

  async function onSubmit(updatedProduct: RefAndParentable<ProductForm>) {
    await updateProduct({
      projectRef,
      productref: product.ref,
      ...updatedProduct,
    }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited product',
      };
      addAlert(alert);
      handleClose(updatedProduct);
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
      <ErrorSummary errors={methods.formState.errors} />
    </FormProvider>
  );
}
