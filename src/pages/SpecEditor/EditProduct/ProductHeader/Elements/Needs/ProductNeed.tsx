import React from 'react';
import { Typography } from '@mui/material';

import css from '../../../../../Stylesheets/Editor.module.scss';
import ProductRequirement from '../Requirment/ProductRequirement';
import { INeed } from '../../../../../../Nexus/entities/INeed';
import { Parentable } from '../../../../../../models/Parentable';

interface IProps {
  need: Parentable<INeed>;
}

export default function ProductNeed({ need }: IProps): React.ReactElement {
  return (
    <div>
      <div className={css.Need}>
        <Typography variant="smBold">{need.title}</Typography>
      </div>
      {need.requirements.map((req) => {
        return <ProductRequirement key={req.id} requirement={req} />;
      })}
    </div>
  );
}
