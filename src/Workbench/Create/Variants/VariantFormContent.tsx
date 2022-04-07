import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control, useWatch } from 'react-hook-form';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import RadioCtrl from '../../../FormProvider/RadioCtrl';
import VariantType from '../../../Nexus/entities/VariantType';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import QuestionsList from './QuestionsList';
import { IVariant } from '../../../Nexus/entities/IVariant';
import SelectionMultipleCtrl from '../../../FormProvider/SelectionMultipleCtrl';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';

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
      <VerticalTextCtrl
        name={`requirementText`}
        label={t('requirementText')}
        placeholder=""
      />
      <VerticalTextCtrl
        name={`instruction`}
        label={t('instruction')}
        placeholder=""
      />
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
