import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Nexus from '../../../Nexus/Nexus';
import ProductQuestionList from './ProductQuestionList';
import SliderCtrl from '../../../FormProvider/SliderCtrl';
import theme from '../../../theme';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import { IMark } from '../../../Nexus/entities/IMark';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { Weighting } from '../../../enums';
import VariantType from '../../../Nexus/entities/VariantType';
import { DFOChip } from '../../../components/DFOChip/DFOChip';

interface IProps {
  requirement: IRequirement;
  variant: IVariant;
}

export default function EditProductVariant({
  requirement,
  variant
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { control, reset } = useFormContext<IRequirementAnswer>();
  const useWeight = useWatch({ name: 'weight', control });
  const defaultValues =
    nexus.specificationService.generateDefaultRequirementAnswer(requirement);
  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: Weighting.MEDIUM, label: t(Weighting[Weighting.MEDIUM]) }
  ]);

  useEffect(() => {
    setSliderMark([{ value: useWeight, label: t(Weighting[useWeight]) }]);
  }, [t, useWeight]);

  const onCancel = () => {
    reset(defaultValues);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: -6 }}>
        <DFOCheckbox checked={true} onClick={onCancel} />
        <Typography variant={'lg'} sx={{ alignSelf: 'center', marginLeft: 2 }}>
          {variant.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flex: '0 0 30%',
            marginLeft: 'auto',
            paddingLeft: 'var(--normal-gap)'
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <SliderCtrl
              name={'weight'}
              label={`${t('Weighting')}:`}
              min={Weighting.LOWEST}
              step={10}
              max={Weighting.HIGHEST}
              showValue={false}
              marks={sliderMark}
            />
          </Box>
          {variant.type === VariantType.info && <DFOChip label={t('Info')} />}
        </Box>
      </Box>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('Requirement text')}
      </Typography>
      <Typography sx={{ marginBottom: 'var(--small-gap)' }}>
        {variant.requirementText ? variant.requirementText : '-'}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('Instruction')}
      </Typography>
      <Typography sx={{ marginBottom: 'var(--small-gap)' }}>
        {variant.instruction ? variant.instruction : '-'}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('How to answer requirement')}
      </Typography>
      <ProductQuestionList variant={variant} />
    </Box>
  );
}
