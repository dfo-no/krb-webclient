import React from 'react';
import { Box, Typography } from '@mui/material';

import ProductRequirement from './ProductRequirement';
import theme from '../../../theme';
import { INeed } from '../../../Nexus/entities/INeed';
import { Parentable } from '../../../models/Parentable';

interface IProps {
  need: Parentable<INeed>;
}

export default function ProductNeed({ need }: IProps): React.ReactElement {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: theme.palette.darkBlue.main,
          color: theme.palette.white.main,
          padding: 0.5,
          paddingLeft: 4,
          margin: 4
        }}
      >
        <Typography variant="smBold">{need.title}</Typography>
      </Box>
      {need.requirements.map((req) => {
        return <ProductRequirement key={req.id} requirement={req} />;
      })}
    </Box>
  );
}
