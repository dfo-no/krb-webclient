import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { t } from 'i18next';

import css from './ProductVariant.module.scss';
import { DFOCheckbox } from '../../../../../../components/DFOCheckbox/DFOCheckbox';
import { DFOChip } from '../../../../../../components/DFOChip/DFOChip';
import { FormIconButton } from '../../../../../../components/Form/FormIconButton';
import { IRequirementAnswer } from '../../../../../../Nexus/entities/IRequirementAnswer';
import { IVariant } from '../../../../../../Nexus/entities/IVariant';
import { VariantType } from '../../../../../../Nexus/enums';

interface IProps {
  variant: IVariant;
}

export default function ProductVariant({
  variant
}: IProps): React.ReactElement {
  const { setValue, control } = useFormContext<IRequirementAnswer>();
  const useVariant = useWatch({ name: 'variantId', control });

  const openVariant = (checkedId: string, variantId: string) => {
    if (variantId === checkedId) {
      setValue('variantId', '');
      return false;
    } else {
      setValue('variantId', variantId);
      return true;
    }
  };

  const variantChecked = (checkedId: string, variantId: string) => {
    return variantId === checkedId;
  };

  return (
    <Controller
      render={({ field: { value: checkedVariantId = useVariant } }) => (
        <Box
          onClick={() => openVariant(checkedVariantId, variant.id)}
          className={css.ProductVariant}
        >
          <DFOCheckbox checked={variantChecked(checkedVariantId, variant.id)} />
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
      )}
      name={''}
    />
  );
}
