import React from 'react';
import { Divider, Typography } from '@mui/material';

import css from './PrefilledResponse.module.scss';
import ProductVariant from './ProductVariant';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { VariantType } from '../../../Nexus/enums';

interface IProps {
  requirement: IRequirement;
}

export default function ProductRequirement({
  requirement
}: IProps): React.ReactElement {
  return (
    <div className={css.PrefilledResponse}>
      <Typography variant="lgBold">{requirement.title}</Typography>
      <Divider className={css.divider} />
      {requirement.variants
        .filter((variant) => variant.type !== VariantType.info)
        .map((variant) => {
          return (
            <ProductVariant
              key={variant.id}
              requirement={requirement}
              variant={variant}
            />
          );
        })}
    </div>
  );
}
