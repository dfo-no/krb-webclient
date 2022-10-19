import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import Nexus from '../../../../Nexus/Nexus';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { ISpecificationProduct } from '../../../../Nexus/entities/ISpecificationProduct';
import {
  ModalButton,
  ModalButtonsBox
} from '../../../../components/ModalBox/ModalBox';
import { useSpecificationState } from '../../SpecificationContext';
import { ModelType, Weighting, WeightingStep } from '../../../../Nexus/enums';
import css from './ProductHeader.module.scss';
import SliderCtrl from '../../../../FormProvider/SliderCtrl';
import { IMark } from '../../../../Nexus/entities/IMark';
import { FormFieldsBox } from '../../../../components/Form/FormFieldsBox';

interface IProps {
  handleClose: () => void;
  specificationProduct: ISpecificationProduct;
}

const EditProductForm = ({ handleClose, specificationProduct }: IProps) => {
  const { t } = useTranslation();
  const { editSpecificationProduct } = useSpecificationState();
  const nexus = Nexus.getInstance();
  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: Weighting.MEDIUM, label: t(Weighting[Weighting.MEDIUM]) },
  ]);

  const methods = useForm<ISpecificationProduct>({
    resolver: nexus.resolverService.resolver(ModelType.specificationProduct),
    defaultValues: specificationProduct,
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
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormFieldsBox className={css.EditProduct}>
          <Typography variant="lgBold">{t('Edit product details')}</Typography>
          <VerticalTextCtrl
            name="title"
            label={t('Name of product')}
            placeholder={t('Name of product')}
            autoFocus
          />
          <VerticalTextCtrl
            className={css.EditProduct__description}
            name="description"
            label={t('Description of the product')}
            placeholder={t('Description of the product')}
          />
          <VerticalTextCtrl
            className={css.EditProduct__amount}
            name="amount"
            label={t(
              'How many of this product do you need in this procurement'
            )}
            placeholder={t('quantity')}
            type={'number'}
            children={
              <Typography variant={'md'}>
                {specificationProduct.unit}
              </Typography>
            }
          />
          <Box className={css.SlideBoxWrapper}>
            <Typography variant={'smBold'} sx={{ marginBottom: 1 }}>
              {t('Weighting')}
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
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('common.Cancel')}
            </ModalButton>
            <ModalButton variant="primary" type="submit">
              {t('Save')}
            </ModalButton>
          </ModalButtonsBox>
        </FormFieldsBox>
      </form>
    </FormProvider>
  );
};

export default EditProductForm;
