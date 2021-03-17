import React, { ReactElement } from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from '@azure/msal-react';
import Col from 'react-bootstrap/esm/Col';
import SignInSignOutButton from './SignInSingOutButton/SignInSignOutButton';

interface Iprops {
  children: any;
}

export default function PageLayout({ children }: Iprops): ReactElement {
  return (
    <>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Col className="col-sm-12 col-md-6 offset-md-3 mt-3">
          {children}

          <SignInSignOutButton />
        </Col>
      </UnauthenticatedTemplate>
    </>
  );
}
