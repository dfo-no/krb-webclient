import React, { ReactElement } from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';
import { Box, Button, Typography } from '@mui/material/';

import css from './AuthenticatedLayout.module.scss';
import { loginRequest } from '../../authentication/authConfig';
import { useTranslation } from 'react-i18next';

interface IProps {
  children: ReactElement | ReactElement[];
}

export default function AuthenticatedLayout({
  children
}: IProps): ReactElement {
  const { instance } = useMsal();
  const { t } = useTranslation();

  return (
    <Box className={css.AuthenticatedLayout}>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Box className={css.signInBox}>
          <Typography variant={'md'}>
            {t('Please sign-in to access this page')}
          </Typography>
          <Button
            variant="primary"
            className={css.signInButton}
            onClick={() => instance.loginPopup(loginRequest)}
          >
            {t('Sign in')}
          </Button>
        </Box>
      </UnauthenticatedTemplate>
    </Box>
  );
}
