import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';
import { loginRequest } from '../authentication/authConfig';

export default function SignedButton(): ReactElement {
  const { instance } = useMsal();
  return (
    <>
      <AuthenticatedTemplate>
        <Button
          variant="secondary"
          onClick={() => instance.logout()}
          className="ml-auto"
        >
          Sign Out
        </Button>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Button
          variant="secondary"
          className="ml-auto"
          onClick={() => instance.loginPopup(loginRequest)}
        >
          Sign in
        </Button>
      </UnauthenticatedTemplate>
    </>
  );
}
