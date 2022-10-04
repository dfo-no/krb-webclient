import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/Editor.module.scss';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import EditIcon from '@mui/icons-material/Edit';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import DFODialog from '../../../components/DFODialog/DFODialog';
import EditResponseProduct from '../EditResponseProduct/EditResponseProduct';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { response } = useAppSelector((state) => state.response);
  const { productIndex } = useProductIndexState();
  const [editingProduct, setEditingProduct] = useState(false);

  return (
    <DFOCardHeader>
      <DFOHeaderContentBox>
        <div className={css.HeaderTop}>
          <Typography variant="lgBold">
            {response.specification.products[productIndex]?.title ??
              t('General requirement')}
          </Typography>
          {productIndex > -1 && (
            <DFOCardHeaderIconButton
              className={css.HeaderBox__productEditIcon}
              onClick={() => setEditingProduct(true)}
            >
              <Typography className={css.HeaderTop__text}>
                {t('Price')}
              </Typography>
              <EditIcon />
            </DFOCardHeaderIconButton>
          )}
        </div>
        <div className={css.HeaderBottom}>
          <Typography variant="smBold">
            {response.specification.products[productIndex]?.description ?? ''}
          </Typography>

          {productIndex !== -1 &&
            response.specification.products[productIndex].originProduct && (
              <Typography className={css.ProductType} variant="smBold">
                {t('From product type')}
                {': '}
                <i>
                  {
                    response.specification.products[productIndex].originProduct
                      .title
                  }
                </i>
              </Typography>
            )}
        </div>
        {editingProduct && (
          <DFODialog
            isOpen={true}
            handleClose={() => setEditingProduct(false)}
            children={
              productIndex > -1 && (
                <EditResponseProduct
                  handleSubmit={() => setEditingProduct(false)}
                />
              )
            }
          />
        )}
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
