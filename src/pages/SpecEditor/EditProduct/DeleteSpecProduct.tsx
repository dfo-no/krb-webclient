import React from 'react';
import { Box } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import DeleteFrame from '../../../components/DeleteFrame/DeleteFrame';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { IAlert } from '../../../models/IAlert';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useAppDispatch } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { useSelectState } from '../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../SpecificationContext';

interface IProps {
  children: React.ReactElement;
  product?: ISpecificationProduct;
  handleClose: () => void;
}

export default function DeleteSpecProduct({
  children,
  product,
  handleClose,
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setProductIndex } = useProductIndexState();
  const { deleteSpecificationProduct } = useSpecificationState();
  const { deleteMode } = useSelectState();

  if (!product || deleteMode !== product.id) {
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
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully deleted product',
    };
    dispatch(addAlert({ alert }));
    setProductIndex(-2);
    handleClose();
  };

  return (
    <Box>
      <DeleteFrame
        children={children}
        canBeDeleted={!hasChildren}
        infoText={infoText}
        handleClose={handleClose}
        onDelete={onDelete}
      />
    </Box>
  );
}
