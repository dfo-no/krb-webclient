import React from 'react';
import { Box, Typography } from '@mui/material';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import EditIcon from '@mui/icons-material/Edit';
import { FormIconButton } from '../../../Workbench/Components/Form/FormIconButton';
import { useFormContext } from 'react-hook-form';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';

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
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <DFOCheckbox value={false} onClick={openVariant} />
      <Typography variant={'lg'} sx={{ alignSelf: 'center', marginLeft: 1 }}>
        {variant.description}
      </Typography>
      <FormIconButton sx={{ marginLeft: 'auto' }} onClick={openVariant}>
        <EditIcon />
      </FormIconButton>
    </Box>
  );
}
