import React from 'react';
import { Typography } from '@mui/material';

import css from '../../../../../Stylesheets/EditorFullPage.module.scss';
import ProductRequirement from '../Requirment/ProductRequirement';
import { INeed } from '../../../../../../Nexus/entities/INeed';
import { Parentable } from '../../../../../../models/Parentable';
import { ISpecificationProduct } from '../../../../../../Nexus/entities/ISpecificationProduct';

interface IProps {
  need: Parentable<INeed>;
  product?: ISpecificationProduct;
}

export default function ProductNeed({
  need,
  product,
}: IProps): React.ReactElement {
  return (
    <div className={css.Needs} data-cy={'product-need'}>
      <Typography variant="mdBold">{need.title}</Typography>
      {need.requirements.map((req) => {
        return (
          <ProductRequirement
            key={req.id}
            requirement={req}
            product={product}
          />
        );
      })}
    </div>
  );
}
