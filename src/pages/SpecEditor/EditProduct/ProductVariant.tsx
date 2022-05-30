import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import { FormIconButton } from '../../../components/Form/FormIconButton';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { IVariant } from '../../../Nexus/entities/IVariant';

interface IProps {
  variant: IVariant;
}

export default function ProductVariant({
  variant
}: IProps): React.ReactElement {
  const { setValue } = useFormContext<IRequirementAnswer>();

  const openVariant = () => {
    setValue('variantId', variant.id);
  };

  return (
    <Box onClick={openVariant} sx={{ display: 'flex', flexDirection: 'row' }}>
      <DFOCheckbox checked={false} />
      <Typography variant={'lg'} sx={{ alignSelf: 'center', marginLeft: 2 }}>
        {variant.description}
      </Typography>
      <FormIconButton sx={{ marginLeft: 'auto' }}>
        <EditIcon />
      </FormIconButton>
    </Box>
  );
}
