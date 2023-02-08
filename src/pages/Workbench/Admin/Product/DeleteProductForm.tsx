import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import DeleteFrame from '../../../../components/DeleteFrame/DeleteFrame';
import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import Utils from '../../../../common/Utils';
import { Alert } from '../../../../models/Alert';
import { IProduct } from '../../../../Nexus/entities/IProduct';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  children: React.ReactElement;
  product: Parentable<IProduct>;
  handleClose: () => void;
  handleCancel: () => void;
}

export default function DeleteProductForm({
  children,
  product,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { deleteProduct } = useProjectMutations();
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const { deleteCandidateId } = useEditableState();

  const methods = useForm<Parentable<IProduct>>({
    defaultValues: product,
    resolver: nexus.resolverService.resolver(ModelType.product),
  });

  useEffect(() => {
    if (product !== methods.getValues()) {
      methods.reset(product);
    }
  }, [product, methods]);

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (deleteCandidateId !== product.id) {
    return children;
  }

  if (!project) {
    return <></>;
  }

  const hasChildren = Utils.checkIfProductHasChildren(
    product,
    project.products
  );
  const isInUse = Utils.productUsedInVariants(product, project);

  let infoText = '';
  if (isInUse) {
    infoText = t('Product has connected requirements');
  }
  if (hasChildren) {
    infoText = `${t('Cant delete this product')} ${t('Product has children')}`;
  }

  const onSubmit = (put: Parentable<IProduct>): void => {
    deleteProduct(put).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted product',
      };
      addAlert(alert);
      handleClose();
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
          canBeDeleted={!hasChildren}
          infoText={infoText}
          handleCancel={handleCancel}
        />
      </form>
    </FormProvider>
  );
}
