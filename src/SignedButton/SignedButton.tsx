import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { loginRequest } from '../authentication/authConfig';

export default function SignedButton(): React.ReactElement {
  const { instance } = useMsal();
  const { t } = useTranslation();
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticatedTemplate>
          <Button variant="ordinary" onClick={() => instance.logout()}>
            {t('sign out')}
          </Button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Button
            variant="ordinary"
            onClick={() => instance.loginPopup(loginRequest)}
          >
            {t('sign in')}
          </Button>
        </UnauthenticatedTemplate>
      </ThemeProvider>
    </>
  );
}
