import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import { RefAndParentable } from '../../../../common/Utils';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { Alert } from '../../../../models/Alert';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import {
  deleteProduct,
  ProductForm,
  useFindOneProject,
  ProductSchema,
} from '../../../../api/nexus2';
import ErrorSummary from '../../../../Form/ErrorSummary';

interface Props {
  projectRef: string;

  children: React.ReactElement;
  product: ProductForm;
  handleClose: (productToDelete: ProductForm) => void;
  handleCancel: () => void;
}

export default function DeleteProductForm({
  projectRef,
  children,
  product,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const { deleteCandidateId } = useEditableState();

  const methods = useForm<ProductForm>({
    defaultValues: product,
    resolver: zodResolver(ProductSchema),
  });

  useEffect(() => {
    if (product !== methods.getValues()) {
      methods.reset(product);
    }
  }, [product, methods]);

  const { projectId } = useParams<IRouteProjectParams>();

  const { project } = useFindOneProject(projectId);

  if (deleteCandidateId !== product.ref) {
    return children;
  }

  if (!project) {
    return <></>;
  }

  const infoText = ''; // TODO slette?

  // if (isInUse) {
  //   infoText = t('Product has connected requirements');
  // }
  // if (hasChildren) {
  //   infoText = `${t('Cant delete this product')} ${t('Product has children')}`;
  // }

  const onSubmit = async (productToDelete: ProductForm): Promise<void> => {
    await deleteProduct({
      projectRef,
      productRef: productToDelete.ref,
    }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted product',
      };
      addAlert(alert);
      handleClose(productToDelete);
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <DeleteFrame
          children={children}
          canBeDeleted={true}
          infoText={infoText}
          handleCancel={handleCancel}
        />
      </form>
    </FormProvider>
  );
}
