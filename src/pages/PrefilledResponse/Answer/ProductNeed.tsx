import React from 'react';
import { Typography } from '@mui/material';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import ProductRequirement from './ProductRequirement';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';

interface IProps {
  need: Parentable<INeed>;
}

export default function ProductNeed({ need }: IProps): React.ReactElement {
  return (
    <div>
      <div className={css.Need}>
        <Typography variant="smBold">{need.title}</Typography>
      </div>
      {need.requirements.map((requirement) => {
        return (
          <ProductRequirement key={requirement.id} requirement={requirement} />
        );
      })}
    </div>
  );
}
