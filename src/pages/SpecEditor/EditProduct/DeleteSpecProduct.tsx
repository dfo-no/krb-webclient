import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { Box } from '@mui/material/';
import DeleteFrame from '../../../components/DeleteFrame/DeleteFrame';
import { deleteSpecProduct } from '../../../store/reducers/specification-reducer';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useSelectState } from '../../Workbench/Create/SelectContext';
import { useTranslation } from 'react-i18next';

interface IProps {
  children: React.ReactElement;
  product: ISpecificationProduct[];
  handleClose: () => void;
}

export default function DeleteSpecProduct({
  children,
  product,
  handleClose
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { productIndex, setProductIndex } = useProductIndexState();
  const { deleteMode } = useSelectState();

  const hasChildren = product[productIndex].requirements.length > 0;

  if (deleteMode !== product[productIndex].id) {
    return children;
  }

  const infoText = hasChildren
    ? `${t('Cant delete this need')} ${t('Need has children')}`
    : '';

  const onDelete = (): void => {
    dispatch(deleteSpecProduct({ index: productIndex }));
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
