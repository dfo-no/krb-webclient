import React, { ReactElement } from 'react';
import { Divider, Typography } from '@mui/material/';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/Editor.module.scss';
import DownloadButton from '../Download/DownloadButton';
import theme from '../../../theme';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useSpecificationState } from '../SpecificationContext';
import {
  IRouteSpecificationParams,
  SpecificationProductPath
} from '../../../models/IRouteSpecificationParams';
import { PRODUCTS, SPECIFICATION } from '../../../common/PathConstants';

function SpecSideBar(): ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { specification } = useSpecificationState();
  const routeMatch = useRouteMatch<IRouteSpecificationParams>(
    SpecificationProductPath
  );
  const productId = routeMatch?.params?.productId;

  const genericPressed = (): void => {
    history.push(`/${SPECIFICATION}/${specification.id}/${PRODUCTS}/general/`);
  };

  const productPressed = (pid: string): void => {
    history.push(`/${SPECIFICATION}/${specification.id}/${PRODUCTS}/${pid}/`);
  };

  const isGeneric = (): boolean => {
    return specification.products.every((product) => product.id !== productId);
  };

  const renderProducts = (product: ISpecificationProduct): ReactElement => {
    const isSelected = product.id === productId;
    return (
      <li
        className={isSelected ? css.Active : undefined}
        key={product.id}
        onClick={() => productPressed(product.id)}
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
      <ul aria-label="products">
        <li
          className={isGeneric() ? css.Active : undefined}
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
      {specification.products.length > 0 && (
        <ul>
          {specification.products.map((element) => {
            return renderProducts(element);
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
