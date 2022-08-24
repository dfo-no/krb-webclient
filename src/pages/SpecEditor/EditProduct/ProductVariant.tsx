import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { t } from 'i18next';

import css from './ProductVariant.module.scss';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import { DFOChip } from '../../../components/DFOChip/DFOChip';
import { FormIconButton } from '../../../components/Form/FormIconButton';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { VariantType } from '../../../Nexus/enums';

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
    <Box onClick={openVariant} className={css.ProductVariant}>
      <DFOCheckbox checked={false} />
      <Typography variant={'lg'} className={css.title}>
        {variant.description}
      </Typography>
      <Box className={css.icons}>
        {variant.type === VariantType.info && <DFOChip label={t('Info')} />}
        <FormIconButton>
          <EditIcon />
        </FormIconButton>
      </Box>
    </Box>
  );
}
