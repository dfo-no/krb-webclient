import classnames from 'classnames';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Control, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import CheckboxCtrl from '../../../../FormProvider/CheckboxCtrl';
import css from './Variant.module.scss';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import MultipleProductSelection from '../../../../components/ProductSelection/MultipleProductSelection';
import QuestionsList from './QuestionsList';
import RadioCtrl from '../../../../FormProvider/RadioCtrl';
import TextAreaCtrl from '../../../../FormProvider/TextAreaCtrl';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { RequirementVariant } from '../../../../api/openapi-fetch';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { VariantType } from '../../../../Nexus/enums';

interface IProps {
  control: Control<RequirementVariant>;
}

const VariantFormContent = ({ control }: IProps) => {
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const useProduct = useWatch({
    control,
    name: 'useProduct',
  });

  if (!project) {
    return <></>;
  }

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
        <MultipleProductSelection
          name={'products'}
          products={project.products}
        />
      )}
      <Typography className={css.TextTitle} variant={'smBold'}>
        {t('How to answer requirement')}
      </Typography>
      <QuestionsList />
    </div>
  );
};

export default VariantFormContent;
