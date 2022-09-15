import React, { useEffect, useState } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import SliderCtrl from '../../FormProvider/SliderCtrl';
import { IMark } from '../../Nexus/entities/IMark';
import { Weighting, WeightingStep } from '../../Nexus/enums';

interface IProps {
  methods: any;
  label?: string;
  className?: string;
}

export default function SliderCtrlComponent({
  methods,
  label,
  className
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: Weighting.MEDIUM, label: t(Weighting[Weighting.MEDIUM]) }
  ]);

  const useWeight = useWatch({ name: 'weight', control: methods.control });

  useEffect(() => {
    setSliderMark([{ value: useWeight, label: t(Weighting[useWeight]) }]);
  }, [t, useWeight]);
  return (
    <FormProvider {...methods}>
      <Box className={className}>
        <SliderCtrl
          label={label}
          name={'weight'}
          min={Weighting.LOWEST}
          step={WeightingStep}
          max={Weighting.HIGHEST}
          showValue={false}
          marks={sliderMark}
        />
      </Box>
    </FormProvider>
  );
}
