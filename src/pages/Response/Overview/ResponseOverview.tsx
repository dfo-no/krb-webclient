import React from 'react';
import { Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import DownloadToolbarItem from '../Download/DownloadToolbarItem';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { PRODUCTS, RESPONSE } from '../../../common/PathConstants';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';

function ResponseOverview(): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { response } = useAppSelector((state) => state.response);
  const { setProductIndex } = useProductIndexState();
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
    const renderProductInfo = () => {
      return (
        <Toolbar>
          <ToolbarItem
            primaryText={t('Quantity')}
            secondaryText={`${product.amount} ${product.unit}`}
            fontSize={'small'}
          />
          <ToolbarItem
            primaryText={t('Type')}
            secondaryText={product.originProduct.title}
            fontSize={'small'}
          />
        </Toolbar>
      );
    };

    return (
      <li key={product.id}>
        <div className={css.CardContent}>
          <div className={css.CardTitle}>
            <Typography>{product.title}</Typography>
          </div>
          <div className={css.Description}>
            <Typography>{product.description}</Typography>
            <Toolbar>
              <ToolbarItem
                secondaryText={t('Edit the product')}
                icon={<EditIcon />}
                handleClick={() => productPressed(index)}
                fontSize={'small'}
              />
            </Toolbar>
          </div>
          {renderProductInfo()}
        </div>
      </li>
    );
  };

  return (
    <div className={css.overview}>
      <div className={css.overview__content}>
        <Typography variant={'lgBold'}>{response.supplier}</Typography>
        <Toolbar hasPadding={true}>
          <DownloadToolbarItem />
        </Toolbar>
        <Typography variant={'mdBold'}>{t('Products')}</Typography>
        <ul aria-label="general-products">
          <li className={css.Active} key={'generic'}>
            <div className={css.CardContent}>
              <div className={css.CardTitle}>
                <Typography>{t('General requirements')}</Typography>
              </div>
              <Toolbar>
                <ToolbarItem
                  secondaryText={t('Edit general requirements')}
                  icon={<EditIcon />}
                  handleClick={() => genericPressed()}
                  fontSize={'small'}
                />
              </Toolbar>
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
      </div>
    </div>
  );
}

export default ResponseOverview;
