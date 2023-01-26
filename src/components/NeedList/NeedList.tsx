import React from 'react';
import { Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';

import css from '../../pages/Stylesheets/NewProduct.module.scss';
import theme from '../../theme';
import Utils from '../../common/Utils';
import { IBank } from '../../Nexus/entities/IBank';
import { IProduct } from '../../Nexus/entities/IProduct';
import { Parentable } from '../../models/Parentable';
import { Need } from '../../api/openapi-fetch';

interface IProps {
  product: Parentable<IProduct>;
  bank: IBank;
  relatedProducts?: string[];
}

export default function NeedList({
  product,
  bank,
  relatedProducts,
}: IProps): React.ReactElement {
  const { t } = useTranslation();

  if (!bank || !product) {
    return <></>;
  }

  const needs = Utils.findVariantsUsedByProduct(product, bank, relatedProducts);

  const renderNeed = (need: Need) => {
    return (
      <li key={need.ref} className={css.Need}>
        <Typography variant="lgBold" className={css.Title}>
          {need.title}
        </Typography>

        {need.description && (
          <Typography variant="sm" className={css.Description}>
            {need.description}
          </Typography>
        )}
      </li>
    );
  };

  const renderList = () => {
    return (
      <ul>
        {needs.map((need: Need) => {
          return renderNeed(need);
        })}
      </ul>
    );
  };

  return (
    <div>
      <Typography variant="smBold" color={theme.palette.primary.main}>
        {t('Requirement you find under')} <i>{product.title}</i>
      </Typography>
      {renderList()}
    </div>
  );
}
