import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import Nexus from '../../../../Nexus/Nexus';
import theme from '../../../../theme';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { ISpecificationProduct } from '../../../../Nexus/entities/ISpecificationProduct';
import {
  ModalBox,
  ModalFieldsBox,
  ModalButtonsBox,
  ModalButton
} from '../../../../components/ModalBox/ModalBox';
import { useSpecificationState } from '../../SpecificationContext';
import { ModelType, Weighting, WeightingStep } from '../../../../Nexus/enums';
import css from './ProductHeader.module.scss';
import SliderCtrl from '../../../../FormProvider/SliderCtrl';
import { IMark } from '../../../../Nexus/entities/IMark';

interface IProps {
  handleClose: () => void;
  specificationProduct: ISpecificationProduct;
}

const EditProductForm = ({ handleClose, specificationProduct }: IProps) => {
  const { t } = useTranslation();
  const { editSpecificationProduct } = useSpecificationState();
  const nexus = Nexus.getInstance();
  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: Weighting.MEDIUM, label: t(Weighting[Weighting.MEDIUM]) }
  ]);

  const methods = useForm<ISpecificationProduct>({
    resolver: nexus.resolverService.resolver(ModelType.specificationProduct),
    defaultValues: specificationProduct
  });

  const useWeight = useWatch({ name: 'weight', control: methods.control });

  useEffect(() => {
    setSliderMark([{ value: useWeight, label: t(Weighting[useWeight]) }]);
  }, [t, useWeight]);

  const onSubmit = (put: ISpecificationProduct): void => {
    editSpecificationProduct(put);
    handleClose();
  };

  return (
    <FormProvider {...methods}>
      <form
        className={css.EditHeader}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <ModalBox>
          <Typography variant="lg" color={theme.palette.primary.main}>
            {t('Edit product')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('Name of product')}
              placeholder={t('Name of product')}
              autoFocus
            />
            <VerticalTextCtrl
              name="description"
              label={t('Description of the product')}
              placeholder={t('Description of the product')}
            />
            <VerticalTextCtrl
              name="amount"
              label={t(
                'How many of this product do you need in this procurement'
              )}
              placeholder={t('quantity')}
              type={'number'}
            />
            <VerticalTextCtrl name="unit" label={t('Unit')} placeholder={''} />
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
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('Save')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
};

export default EditProductForm;
