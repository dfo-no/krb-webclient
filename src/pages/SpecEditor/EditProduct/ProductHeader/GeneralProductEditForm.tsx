import React, { ReactElement, useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Nexus from '../../../../Nexus/Nexus';
import { ModelType, Weighting, WeightingStep } from '../../../../Nexus/enums';
import { ISpecification } from '../../../../Nexus/entities/ISpecification';
import {
  ModalBox,
  ModalButtonsBox
} from '../../../../components/ModalBox/ModalBox';
import { IMark } from '../../../../Nexus/entities/IMark';
import SliderCtrl from '../../../../FormProvider/SliderCtrl';
import css from './ProductHeader.module.scss';

interface IProps {
  handleClose: () => void;
  specification: ISpecification;
}

export function GeneralProductEditForm({
  specification,
  handleClose
}: IProps): ReactElement {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: Weighting.MEDIUM, label: t(Weighting[Weighting.MEDIUM]) }
  ]);

  const methods = useForm<ISpecification>({
    resolver: nexus.resolverService.resolver(ModelType.specification),
    defaultValues: specification
  });

  const useWeight = useWatch({ name: 'weight', control: methods.control });

  useEffect(() => {
    setSliderMark([{ value: useWeight, label: t(Weighting[useWeight]) }]);
  }, [t, useWeight]);

  const onSubmit = (): void => {
    nexus.specificationService
      .setSpecification(specification)
      .then(() => handleClose());
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <ModalBox>
          <Box className={css.SlideBox}>
            <SliderCtrl
              label={`${t('Weighting')}:`}
              name={'weight'}
              min={Weighting.LOWEST}
              step={WeightingStep}
              max={Weighting.HIGHEST}
              showValue={false}
              marks={sliderMark}
            />
          </Box>
          <ModalButtonsBox>
            <Button
              className={css.SlideBox__button}
              variant={'primary'}
              onClick={() => onSubmit()}
            >
              {t('Close')}
            </Button>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
}
