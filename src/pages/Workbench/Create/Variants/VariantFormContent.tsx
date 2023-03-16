import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Control, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CheckboxCtrl from '../../../../FormProvider/CheckboxCtrl';
import css from './Variant.module.scss';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import { MultipleProductSelection } from '../../../../components/ProductSelection/MultipleProductSelectionKRB858';
import QuestionsList from './QuestionsList';
import RadioCtrl from '../../../../FormProvider/RadioCtrl';
import TextAreaCtrl from '../../../../FormProvider/TextAreaCtrl';
import { VariantType } from '../../../../Nexus/enums';
import {
  findProducts,
  ProductForm,
  RequirementVariantForm,
} from '../../../../api/nexus2';

interface Props {
  projectRef: string;
  control: Control<RequirementVariantForm>;
}

export const VariantFormContent = ({ projectRef, control }: Props) => {
  const { t } = useTranslation();
  const useProduct = useWatch({
    control,
    name: 'useProduct',
  });

  const [products, setProducts] = useState<ProductForm[]>([]);

  useEffect(() => {
    findProducts({
      projectRef,
    }).then((response) => {
      setProducts(response.data);
    });
  }, [projectRef]);




  return (
    <div className={css.VariantContent}>
      <Typography className={css.TextTitle} variant={'smBold'}>
        {t('Description')}
      </Typography>
      <HorizontalTextCtrl
        className={css.TextField}
        name={`description`}
        placeholder={t('Requirement short description')}
        autoFocus
      />
      <Typography className={css.TextTitle} variant={'smBold'}>
        {t('Requirement text')}
      </Typography>
      <TextAreaCtrl
        className={classnames(css.TextField, css.TextAreaField)}
        name={`requirementText`}
        placeholder={t('Requirement vendor text')}
      />
      <Typography className={css.TextTitle} variant={'smBold'}>
        {t('Instruction')}
      </Typography>
      <TextAreaCtrl
        className={classnames(css.TextField, css.TextAreaField)}
        name={`instruction`}
        placeholder={t('Requirement guide for client')}
      />
      <Typography className={css.TextTitle} variant={'smBold'}>
        {t('Type variant')}
      </Typography>
      <RadioCtrl
        className={classnames(css.TextField, css.RadioField)}
        name="type"
        options={[
          {
            value: VariantType.requirement,
            label: t('Requirement'),
            recommended: false,
          },
          { value: VariantType.info, label: t('Info'), recommended: false },
        ]}
      />
      <Typography className={css.TextTitle} variant={'smBold'}>
        {t('How to use this requirement')}
      </Typography>
      <Box className={classnames(css.TextField, css.CheckboxField)}>
        <CheckboxCtrl name={`useProduct`} label={`${t('Product')}`} />
        <CheckboxCtrl
          name={`useSpesification`}
          label={`${t('General requirement')}`}
        />
      </Box>
      {useProduct && (
        <MultipleProductSelection name={'products'} products={products || []} />
      )}
      <Typography className={css.TextTitle} variant={'smBold'}>
        {t('How to answer requirement')}
      </Typography>
      <QuestionsList />
    </div>
  );
};
