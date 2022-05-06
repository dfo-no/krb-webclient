import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import { IVariant } from '../../../Nexus/entities/IVariant';
import ProductQuestionList from './ProductQuestionList';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { useFormContext, useWatch } from 'react-hook-form';
import Nexus from '../../../Nexus/Nexus';
import SliderCtrl from '../../../FormProvider/SliderCtrl';
import { IMark } from '../../../Nexus/entities/IMark';
import { WeightEnum } from '../../../models/WeightEnum';

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
    { value: 30, label: t(WeightEnum[WeightEnum.MEDIUM]) }
  ]);

  useEffect(() => {
    setSliderMark([{ value: useWeight, label: t(WeightEnum[useWeight]) }]);
  }, [t, useWeight]);

  const onCancel = () => {
    reset(defaultValues);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: -6 }}>
        <DFOCheckbox value={true} onClick={onCancel} />
        <Typography variant={'lg'} sx={{ alignSelf: 'center', marginLeft: 1 }}>
          {variant.description}
        </Typography>
        <Box sx={{ flex: '0 0 15%', marginLeft: 'auto', paddingLeft: 4 }}>
          <SliderCtrl
            name={'weight'}
            label={`${t('Weighting')}:`}
            min={10}
            step={10}
            max={50}
            showValue={false}
            marks={sliderMark}
          />
        </Box>
      </Box>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('requirementText')}
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        {variant.requirementText ? variant.requirementText : '-'}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('instruction')}
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        {variant.instruction ? variant.instruction : '-'}
      </Typography>
      <Typography variant={'smBold'}>
        {t('how to answer requirement')}
      </Typography>
      <ProductQuestionList variant={variant} />
    </Box>
  );
}
