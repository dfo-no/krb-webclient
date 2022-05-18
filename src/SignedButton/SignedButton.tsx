import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';
import Button from '@mui/material/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { loginRequest } from '../authentication/authConfig';

export default function SignedButton(): React.ReactElement {
  const { instance } = useMsal();
  const { t } = useTranslation();
  return (
    <>
      <AuthenticatedTemplate>
        <Button variant="primary" onClick={() => instance.logout()}>
          {t('Sign out')}
        </Button>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Button
          variant="primary"
          onClick={() => instance.loginPopup(loginRequest)}
        >
          {t('Sign in')}
        </Button>
      </UnauthenticatedTemplate>
    </>
  );
}
