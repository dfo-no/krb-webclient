import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import RadioCtrl from '../../../FormProvider/RadioCtrl';
import SelectionMultipleCtrl from '../../../FormProvider/SelectionMultipleCtrl';
import TextAreaCtrl from '../../../FormProvider/TextAreaCtrl';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { IVariant } from '../../../Nexus/entities/IVariant';
import VariantType from '../../../Nexus/entities/VariantType';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { IRouteParams } from '../../Models/IRouteParams';
import QuestionsList from './QuestionsList';

interface IProps {
  control: Control<IVariant>;
}

const VariantFormContent = ({ control }: IProps) => {
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteParams>();
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
      <Divider sx={{ marginBottom: 2 }} />
      <VerticalTextCtrl
        name={`description`}
        label={t('Description')}
        placeholder=""
      />
      <Box sx={{ marginBottom: 4 }}>
        <TextAreaCtrl
          name={`requirementText`}
          label={t('requirementText')}
          placeholder=""
        />
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <TextAreaCtrl
          name={`instruction`}
          label={t('instruction')}
          placeholder=""
        />
      </Box>
      <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
        {t('type variant')}
      </Typography>
      <RadioCtrl
        name="type"
        options={[
          { value: VariantType.requirement, label: 'Krav' },
          { value: VariantType.info, label: 'Info' }
        ]}
      />
      <Typography variant={'smBold'} sx={{ marginTop: 4, marginBottom: 2 }}>
        {t('how to use this requirement')}
      </Typography>
      <Box sx={{ width: '100%', marginBottom: 2 }}>
        <CheckboxCtrl name={`useProduct`} label={`${t('product')}`} />
        <CheckboxCtrl
          name={`useSpesification`}
          label={`${t('general requirement')}`}
        />
      </Box>
      {useProduct && (
        <SelectionMultipleCtrl name={'products'} items={project.products} />
      )}
      <Typography variant={'smBold'} sx={{ marginTop: 4, marginBottom: 2 }}>
        {t('how to answer requirement')}
      </Typography>
      <QuestionsList />
    </>
  );
};

export default VariantFormContent;
