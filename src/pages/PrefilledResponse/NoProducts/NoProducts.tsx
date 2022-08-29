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
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
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
          {prefilledResponse.bank.title}
        </Typography>
        <Typography variant="md">{t('PREF_RES_BUILDING_SPEC')}</Typography>
        <Typography variant="md">
          {t('PREF_RES_CREATE_PRODUCT_PROCUREMENT')}
        </Typography>
        <Typography variant="md">
          {t('PREF_RES_FIND_PREDEF_PROCUREMENT')}
        </Typography>
        <Typography variant="md">{t('PREF_RES_DOWNLOAD_SPEC')}</Typography>
      </div>
      <Button variant="primary" onClick={() => setCreate(true)}>
        {t('Create your first product')}
      </Button>
    </div>
  );
}
