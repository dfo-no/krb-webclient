import React from 'react';
import { Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';

import css from './NewProduct.module.scss';
import theme from '../../../theme';
import Utils from '../../../common/Utils';
import { INeed } from '../../../Nexus/entities/INeed';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { Parentable } from '../../../models/Parentable';
import { useAppSelector } from '../../../store/hooks';

interface IProps {
  product: Parentable<IProduct>;
}

export default function NeedList({ product }: IProps): React.ReactElement {
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);

  if (!spec.bank || !product) {
    return <></>;
  }

  const needs = Utils.findVariantsUsedByProduct(product, spec.bank);

  const renderNeed = (need: Parentable<INeed>) => {
    return (
      <li key={need.id} className={css.Need}>
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
        {needs.map((need: Parentable<INeed>) => {
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
