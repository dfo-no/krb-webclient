import React from 'react';
import { Box, Typography } from '@mui/material';

import css from '../ResponseEditor.module.scss';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';

interface IProps {
  need: Parentable<INeed>;
}

export default function ProductNeed({ need }: IProps): React.ReactElement {
  return (
    <Box className={css.need}>
      <Typography variant="smBold">{need.title}</Typography>
    </Box>
  );
}
