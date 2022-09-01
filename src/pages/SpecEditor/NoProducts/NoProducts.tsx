import React from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import byggernIllustration from '../../../assets/images/byggern-illustration.svg';
import css from '../../Stylesheets/NoProducts.module.scss';
import theme from '../../../theme';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';

export default function NoProducts(): React.ReactElement {
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);
  const { setCreate } = useProductIndexState();

  return (
    <div className={css.NoProducts}>
      <img
        src={byggernIllustration}
        alt="main illustration"
        height="385"
        width="594"
      />
      <div className={css.Text}>
        <Typography variant="lgBold" color={theme.palette.primary.main}>
          {spec.title}
        </Typography>
        <Typography variant="md">{t('SPEC_BUILDING_SPEC')}</Typography>
        <Typography variant="md">
          {t('SPEC_CREATE_PRODUCT_PROCUREMENT')}
        </Typography>
        <Typography variant="md">
          {t('SPEC_FIND_PREDEF_PROCUREMENT')}
        </Typography>
        <Typography variant="md">{t('SPEC_DOWNLOAD_SPEC')}</Typography>
      </div>
      <Button variant="primary" onClick={() => setCreate(true)}>
        {t('Create your first product')}
      </Button>
    </div>
  );
}
