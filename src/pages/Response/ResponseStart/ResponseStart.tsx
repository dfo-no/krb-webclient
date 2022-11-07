import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import byggernIllustration from '../../../assets/images/byggern-illustration.svg';
import css from '../../Stylesheets/NoProducts.module.scss';
import theme from '../../../theme';
import { useResponseState } from '../ResponseContext';

export default function ResponseStart(): React.ReactElement {
  const { t } = useTranslation();
  const { response } = useResponseState();

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
          {response.specification.title}
        </Typography>
        <Typography variant="md">{t('RESP_BUILDING_RESP')}</Typography>
        <Typography variant="md">
          {t('RESP_ANSWER_PRODUCT_PROCUREMENT')}
        </Typography>
        <Typography variant="md">{t('RESP_PERCENTAGE_PROCUREMENT')}</Typography>
        <Typography variant="md">{t('RESP_DOWNLOAD_RESP')}</Typography>
      </div>
    </div>
  );
}
