import React, { ReactElement } from 'react';
import { Button, Divider, Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/Editor.module.scss';
import DownloadButton from '../Download/DownloadButton';
import theme from '../../../theme';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';

function SpecSideBar(): ReactElement {
  const { t } = useTranslation();

  const { spec } = useAppSelector((state) => state.specification);
  const { productIndex, setProductIndex, setCreate } = useProductIndexState();

  const genericPressed = (): void => {
    setProductIndex(-1);
  };

  const productPressed = (index: number): void => {
    setProductIndex(index);
  };

  const createPressed = (): void => {
    setCreate(true);
  };

  const renderProducts = (
    product: ISpecificationProduct,
    index: number
  ): ReactElement => {
    const isSelected = index === productIndex;
    return (
      <li
        className={isSelected ? css.Active : undefined}
        key={product.id}
        onClick={() => productPressed(index)}
      >
        <div className={css.CardContent}>
          <div className={css.CardTitle}>
            <Typography className={css.Text} variant="mdBold">
              {product.title}
            </Typography>
            <Typography variant="mdBold">{product.amount}</Typography>
          </div>
          <Divider color={theme.palette.silver.main} />
          <Typography className={css.Text} variant="sm">
            {product.description}
          </Typography>
        </div>
      </li>
    );
  };

  return (
    <div className={css.SideBar}>
      <div className={css.Button}>
        <Button variant="primary" onClick={createPressed}>
          {t('Create a new product')}
        </Button>
      </div>
      <ul aria-label="products">
        <li
          className={productIndex === -1 ? css.Active : undefined}
          key={'generic'}
          onClick={() => genericPressed()}
        >
          <div className={css.CardContent}>
            <div className={css.CardTitle}>
              <Typography variant="mdBold">
                {t('General requirements')}
              </Typography>
            </div>
            <Divider color={theme.palette.silver.main} />
          </div>
        </li>
      </ul>
      {spec.products.length > 0 && (
        <ul>
          {spec.products.map((element, index) => {
            return renderProducts(element, index);
          })}
        </ul>
      )}
      <div className={css.Button}>
        <DownloadButton />
      </div>
    </div>
  );
}

export default SpecSideBar;
