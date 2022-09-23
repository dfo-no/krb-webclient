import React, { ReactElement, useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

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
import GeneralErrorMessage from '../../../../Form/GeneralErrorMessage';
import { SPECIFICATION } from '../../../../common/PathConstants';
import theme from '../../../../theme';

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
  const history = useHistory();
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

  const onSubmit = (post: ISpecification): void => {
    const specificationWithId = nexus.specificationService.withId(post);
    nexus.specificationService
      .setSpecification(specificationWithId)
      .then(() => history.push(`/${SPECIFICATION}/${specificationWithId.id}`));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <ModalBox>
          <Box className={css.SlideBoxWrapper}>
            <Typography
              variant={'smBold'}
              color={theme.palette.primary.main}
              sx={{ marginBottom: 1 }}
            >
              {t('Product weighting')}
            </Typography>
            <Box className={css.SlideBox}>
              <SliderCtrl
                name={'weight'}
                min={Weighting.LOWEST}
                step={WeightingStep}
                max={Weighting.HIGHEST}
                showValue={false}
                marks={sliderMark}
              />
            </Box>
          </Box>
          <ModalButtonsBox>
            <Button
              className={css.SlideBox__button}
              variant={'save'}
              onClick={() => handleClose()}
            >
              {t('Save')}
            </Button>
          </ModalButtonsBox>
        </ModalBox>
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
}
