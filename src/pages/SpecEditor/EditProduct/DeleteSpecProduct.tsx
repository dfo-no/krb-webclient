import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material/';
import { v4 as uuidv4 } from 'uuid';

import { IAlert } from '../../../models/IAlert';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import DeleteFrame from '../../../components/DeleteFrame/DeleteFrame';
import { deleteSpecProduct } from '../../../store/reducers/specification-reducer';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useSelectState } from '../../Workbench/Create/SelectContext';

interface IProps {
  children: React.ReactElement;
  product?: ISpecificationProduct;
  handleClose: () => void;
}

export default function DeleteSpecProduct({
  children,
  product,
  handleClose
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setProductIndex } = useProductIndexState();
  const { deleteMode } = useSelectState();

  if (!product || deleteMode !== product.id) {
    return children;
  }

  const hasChildren = product && product.requirements.length > 0;

  const infoText = hasChildren
    ? `${t('Cant delete this product')} ${t('Product has children')}`
    : '';

  const onDelete = (): void => {
    dispatch(deleteSpecProduct({ productId: product.id }));
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully deleted product'
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
