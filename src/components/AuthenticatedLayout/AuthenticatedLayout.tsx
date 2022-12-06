import React, { ReactElement } from 'react';
import { Box, Button, Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import { useOidc } from '@axa-fr/react-oidc';

import css from './AuthenticatedLayout.module.scss';

interface IProps {
  children: ReactElement | ReactElement[];
}

export default function AuthenticatedLayout({
  children,
}: IProps): ReactElement {
  const { t } = useTranslation();
  const { login, isAuthenticated } = useOidc();

  return (
    <Box className={css.AuthenticatedLayout}>
      {isAuthenticated && children}
      {!isAuthenticated && (
        <Box className={css.signInBox}>
          <Typography variant={'md'}>
            {t('Please sign-in to access this page')}
          </Typography>
          <Button
            variant="primary"
            className={css.signInButton}
            onClick={() => login()}
          >
            {t('Sign in')}
          </Button>
        </Box>
      )}
    </Box>
  );
}
