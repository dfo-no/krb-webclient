import React from 'react';
import { Divider, Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/Editor.module.scss';
import DownloadButton from '../Download/DownloadButton';
import theme from '../../../theme';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { useHistory } from 'react-router-dom';
import { PRODUCTS, RESPONSE } from '../../../common/PathConstants';

function ResponseSideBar(): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { response } = useAppSelector((state) => state.response);
  const { productIndex, setProductIndex } = useProductIndexState();
  console.log(response);
  const genericPressed = () => {
    setProductIndex(-1);
    history.push(
      `/${RESPONSE}/${response.specification.bank.id}/${PRODUCTS}/general/`
    );
  };

  const productPressed = (index: number) => {
    setProductIndex(index);
    history.push(
      `/${RESPONSE}/${response.specification.bank.id}/${PRODUCTS}/${response.products[index].id}/`
    );
  };

  const renderProducts = (product: ISpecificationProduct, index: number) => {
    const isSelected = productIndex === index;
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
            <div>
              <Typography variant="mdBold">{product.amount}</Typography>{' '}
              <Typography variant="mdBold">{product.unit}</Typography>
            </div>
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
      {response.specification.products.length > 0 && (
        <ul>
          {response.specification.products.map((element, index) => {
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

export default ResponseSideBar;
