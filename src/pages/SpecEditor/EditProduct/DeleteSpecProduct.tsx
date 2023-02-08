import React from 'react';
import { Box } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import DeleteFrame from '../../../components/DeleteFrame/DeleteFrame';
import { Alert } from '../../../models/Alert';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { useSelectState } from '../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../SpecificationContext';
import { AlertsContainer } from '../../../components/Alert/AlertContext';

interface IProps {
  children: React.ReactElement;
  product?: ISpecificationProduct;
  handleClose: () => void;
  handleCancel: () => void;
}

export default function DeleteSpecProduct({
  children,
  product,
  handleClose,
  handleCancel,
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const { addAlert } = AlertsContainer.useContainer();
  const { setProductIndex } = useProductIndexState();
  const { deleteSpecificationProduct } = useSpecificationState();
  const { deleteCandidateId } = useSelectState();

  if (!product || deleteCandidateId !== product.id) {
    return children;
  }

  const hasChildren = product && product.requirements.length > 0;

  const infoText = hasChildren
    ? `${t('Cant delete this product')} ${t(
        'Product has answered requirements'
      )}`
    : '';

  const onDelete = (): void => {
    deleteSpecificationProduct(product);
    const alert: Alert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully deleted product',
    };
    addAlert(alert);
    setProductIndex(-2);
    handleClose();
  };

  return (
    <Box>
      <DeleteFrame
        children={children}
        canBeDeleted={!hasChildren}
        infoText={infoText}
        handleCancel={handleCancel}
        onDelete={onDelete}
      />
    </Box>
  );
}
