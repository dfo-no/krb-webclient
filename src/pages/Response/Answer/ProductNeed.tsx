import React from 'react';
import { Typography } from '@mui/material';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';

interface IProps {
  need: Parentable<INeed>;
}

export default function ProductNeed({ need }: IProps): React.ReactElement {
  return (
    <div className={css.Need}>
      <Typography variant="mdBold">{need.title}</Typography>
    </div>
  );
}
