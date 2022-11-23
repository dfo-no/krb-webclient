import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';
import DownloadToolbarItem from '../../PrefilledResponse/Download/DownloadToolbarItem';
import { useAppSelector } from '../../../store/hooks';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { IPrefilledResponseProduct } from '../../../Nexus/entities/IPrefilledResponseProduct';
import { PRODUCTS, PREFILLED_RESPONSE } from '../../../common/PathConstants';
import NewProductSelection from '../NewProduct/NewProductSelection';

export default function PrefilledResponseOverview(): ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const { setProductIndex, setOpenProductSelection, openProductSelection } =
    useProductIndexState();

  const genericPressed = () => {
    setProductIndex(-1);
    history.push(
      `/${PREFILLED_RESPONSE}/${prefilledResponse.bank.id}/${PRODUCTS}/general/`
    );
  };

  const createPressed = (): void => {
    setOpenProductSelection(true);
  };

  const productPressed = (index: number, productId: string) => {
    setProductIndex(index);
    history.push(
      `/${PREFILLED_RESPONSE}/${prefilledResponse.bank.id}/${PRODUCTS}/${productId}/`
    );
  };

  const renderProducts = (
    product: IPrefilledResponseProduct,
    index: number
  ) => {
    const renderProductInfo = () => {
      return (
        <Toolbar>
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
          <Toolbar spacingType={'between'}>
            <Typography>{product.description}</Typography>
            <ToolbarItem
              secondaryText={t('Edit the product')}
              icon={<EditIcon />}
              handleClick={() => productPressed(index, product.id)}
              fontSize={'small'}
            />
          </Toolbar>
          {renderProductInfo()}
        </div>
      </li>
    );
  };

  return (
    <div className={css.overview}>
      <div className={css.overview__content}>
        <Typography variant={'lgBold'}>{prefilledResponse.supplier}</Typography>
        <Toolbar hasPadding={true}>
          <DownloadToolbarItem />
        </Toolbar>
        <Toolbar spacingType={'between'}>
          <ToolbarItem
            secondaryText={t('Products')}
            disablePadding={true}
            fontWeight={'semibold'}
          />
          {prefilledResponse.bank.products.length > 0 && (
            <ToolbarItem
              primaryText={t('Create a new product')}
              icon={<AddIcon />}
              handleClick={createPressed}
            />
          )}
        </Toolbar>
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
        {prefilledResponse.products.length > 0 && (
          <ul>
            {prefilledResponse.products.map((element, index) => {
              return renderProducts(element, index);
            })}
          </ul>
        )}
      </div>
      {openProductSelection && <NewProductSelection />}
    </div>
  );
}
