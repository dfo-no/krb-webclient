import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import Utils, { RefAndParentable } from '../../../../common/Utils';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { Alert } from '../../../../models/Alert';
import { IProduct } from '../../../../Nexus/entities/IProduct';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ModelType } from '../../../../Nexus/enums';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import {
  deleteProduct,
  ProductForm,
  ProductSchema, useFindOneProject,
} from '../../../../api/nexus2';

interface Props {
  projectRef: string;

  children: React.ReactElement;
  product: RefAndParentable<ProductForm>;
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

  const methods = useForm<RefAndParentable<ProductForm>>({
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

  // const hasChildren = Utils.checkIfProductHasChildren(
  //   product,
  //   project.products
  // );

  //  const isInUse = project && Utils.productUsedInVariants(product, project);

  const infoText = '';
  // if (isInUse) {
  //   infoText = t('Product has connected requirements');
  // }
  // if (hasChildren) {
  //   infoText = `${t('Cant delete this product')} ${t('Product has children')}`;
  // }

  // const onSubmit = (productToDelete: RefAndParentable<ProductForm>) => {
  //   console.log('hello from submit', productToDelete);
  // };

  const onSubmit = async (productToDelete: RefAndParentable<ProductForm>): Promise<void> => {
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
