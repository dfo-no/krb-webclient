// import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
// import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './EditProductVariant.module.scss';
import ProductQuestionList from '../QuestionList/ProductQuestionList';
// import SliderCtrl from '../../../../../../FormProvider/SliderCtrl';
import theme from '../../../../../../theme';
import { DFOChip } from '../../../../../../components/DFOChip/DFOChip';
// import { IMark } from '../../../../../../Nexus/entities/IMark';
import { IRequirement } from '../../../../../../Nexus/entities/IRequirement';
// import { IRequirementAnswer } from '../../../../../../Nexus/entities/IRequirementAnswer';
import { IVariant } from '../../../../../../Nexus/entities/IVariant';
import {
  VariantType,
  // Weighting,
  // WeightingStep,
} from '../../../../../../Nexus/enums';

interface IProps {
  requirement: IRequirement;
  variant: IVariant;
}

// TODO: Når en stiller tilbake alt etter brukertesten så kan denne linja bare få være som den er nå, og denne kommentaren kan slettes
export default function EditProductVariant({ variant }: IProps): ReactElement {
  const { t } = useTranslation();
  // const { control } = useFormContext<IRequirementAnswer>();
  /* const useWeight = useWatch({ name: 'weight', control });
  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: Weighting.MEDIUM, label: t(Weighting[Weighting.MEDIUM]) },
  ]);

  useEffect(() => {
    setSliderMark([{ value: useWeight, label: t(Weighting[useWeight]) }]);
  }, [t, useWeight]);*/

  return (
    <Box className={css.EditProductVariant}>
      <Box className={css.titleRow}>
        <Typography variant={'lg'} className={css.title}>
          {variant.description}
        </Typography>
        <Box className={css.slider}>
          {variant.type === VariantType.info ? (
            <DFOChip label={t('Info')} sx={{ marginLeft: 'auto' }} />
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              {/* <SliderCtrl
                name={'weight'}
                label={`${t('Weighting')}:`}
                min={Weighting.LOWEST}
                step={WeightingStep}
                max={Weighting.HIGHEST}
                showValue={false}
                marks={sliderMark}
              />*/}
            </Box>
          )}
        </Box>
      </Box>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('Requirement text')}
      </Typography>
      <Typography className={css.infoText}>
        {variant.requirementText ? variant.requirementText : '-'}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('Instruction')}
      </Typography>
      <Typography className={css.infoText}>
        {variant.instruction ? variant.instruction : '-'}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('How to answer requirement')}
      </Typography>
      <ProductQuestionList variant={variant} />
    </Box>
  );
}
