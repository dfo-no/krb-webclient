import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { t } from 'i18next';

import css from './ProductVariant.module.scss';
import { IRequirementAnswer } from '../../../../../../Nexus/entities/IRequirementAnswer';
import { IVariant } from '../../../../../../Nexus/entities/IVariant';
import ToolbarItem from '../../../../../../components/UI/Toolbar/ToolbarItem';
import Toolbar from '../../../../../../components/UI/Toolbar/ToolBar';

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

  return (
    <Controller
      render={({ field: { value: checkedVariantId = useVariant } }) => (
        <Box className={css.ProductVariant}>
          <div className={css.content}>
            <Typography variant={'smBold'}>{variant.description}</Typography>
            <Typography variant={'sm'}>{variant.requirementText}</Typography>
          </div>
          <div className={css.choose}>
            <Toolbar>
              <ToolbarItem
                secondaryText={t('Choose variant')}
                icon={<AddIcon />}
                handleClick={() => openVariant(checkedVariantId, variant.id)}
              />
            </Toolbar>
          </div>
        </Box>
      )}
      name={''}
    />
  );
}
