import React from 'react';
import { Box, Typography } from '@mui/material';
import { Control, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import CheckboxCtrl from '../../../../FormProvider/CheckboxCtrl';
import ProductSelection from './ProductSelection';
import QuestionsList from './QuestionsList';
import RadioCtrl from '../../../../FormProvider/RadioCtrl';
import TextAreaCtrl from '../../../../FormProvider/TextAreaCtrl';
import theme from '../../../../theme';
import VariantType from '../../../../Nexus/entities/VariantType';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { IVariant } from '../../../../Nexus/entities/IVariant';
import { useGetProjectQuery } from '../../../../store/api/bankApi';

interface IProps {
  control: Control<IVariant>;
}

const VariantFormContent = ({ control }: IProps) => {
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const useProduct = useWatch({
    control,
    name: 'useProduct'
  });

  if (!project) {
    return <></>;
  }

  return (
    <>
      <Box sx={{ marginBottom: 4 }}>
        <VerticalTextCtrl
          name={`description`}
          label={t('Description')}
          placeholder={t('Requirement short description')}
        />
      </Box>
      <Typography
        variant={'smBold'}
        color={theme.palette.primary.main}
        sx={{ marginBottom: 1 }}
      >
        {t('Requirement text')}
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <TextAreaCtrl
          name={`requirementText`}
          placeholder={t('Requirement vendor text')}
        />
      </Box>
      <Typography
        variant={'smBold'}
        color={theme.palette.primary.main}
        sx={{ marginBottom: 1 }}
      >
        {t('Instruction')}
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <TextAreaCtrl
          name={`instruction`}
          placeholder={t('Requirement guide for client')}
        />
      </Box>
      <Typography
        variant={'smBold'}
        sx={{ marginBottom: 2, color: 'var(--primary-color)' }}
      >
        {t('Type variant')}
      </Typography>
      <RadioCtrl
        name="type"
        options={[
          {
            value: VariantType.requirement,
            label: t('Requirement'),
            recommended: false
          },
          { value: VariantType.info, label: t('Info'), recommended: false }
        ]}
      />
      <Typography
        variant={'smBold'}
        sx={{ marginTop: 4, marginBottom: 2, color: 'var(--primary-color)' }}
      >
        {t('How to use this requirement')}
      </Typography>
      <Box sx={{ display: 'flex', width: '100%', marginBottom: 2, gap: 2 }}>
        <CheckboxCtrl name={`useProduct`} label={`${t('Product')}`} />
        <CheckboxCtrl
          name={`useSpesification`}
          label={`${t('General requirement')}`}
        />
      </Box>
      {useProduct && <ProductSelection />}
      <Typography
        variant={'smBold'}
        sx={{ marginTop: 4, marginBottom: 2, color: 'var(--primary-color)' }}
      >
        {t('How to answer requirement')}
      </Typography>
      <QuestionsList />
    </>
  );
};

export default VariantFormContent;
