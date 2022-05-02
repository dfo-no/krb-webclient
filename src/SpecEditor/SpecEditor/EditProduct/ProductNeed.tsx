import React from 'react';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import { Box, Typography } from '@mui/material';
import theme from '../../../theme';
import ProductRequirement from './ProductRequirement';
import { useSpecificationState } from '../../SpecificationContext';

interface IProps {
  need: Parentable<INeed>;
}

export default function ProductNeed({ need }: IProps): React.ReactElement {
  const { specificationProductIndex } = useSpecificationState();
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
      {specificationProductIndex !== -1 &&
        need.requirements.map((req) => {
          return <ProductRequirement key={req.id} requirement={req} />;
        })}
    </Box>
  );
}
