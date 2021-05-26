import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';
import { useTranslation } from 'react-i18next';
import { loginRequest } from '../authentication/authConfig';

export default function SignedButton(): ReactElement {
  const { instance } = useMsal();
  const { t } = useTranslation();
  return (
    <>
      <AuthenticatedTemplate>
        <Button
          variant="secondary"
          onClick={() => instance.logout()}
          className="ml-auto"
        >
          {t('sign out')}
        </Button>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Button
          variant="secondary"
          className="ml-auto"
          onClick={() => instance.loginPopup(loginRequest)}
        >
          {t('sign in')}
        </Button>
      </UnauthenticatedTemplate>
    </>
  );
}
