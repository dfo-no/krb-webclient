import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { loginRequest } from '../authentication/authConfig';

export default function SignedButton(): React.ReactElement {
  const { instance } = useMsal();
  const { t } = useTranslation();
  return (
    <>
      <AuthenticatedTemplate>
        <Button onClick={() => instance.logout()}>{t('sign out')}</Button>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Button onClick={() => instance.loginPopup(loginRequest)}>
          {t('sign in')}
        </Button>
      </UnauthenticatedTemplate>
    </>
  );
}
