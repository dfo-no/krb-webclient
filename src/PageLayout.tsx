import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from '@azure/msal-react';
import React from 'react';
import Col from 'react-bootstrap/Col';
import SignedButton from './SignedButton/SignedButton';

interface Iprops {
  children: JSX.Element | JSX.Element[];
}

export default function PageLayout({ children }: Iprops): React.ReactElement {
  return (
    <>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Col className="col-sm-12 col-md-6 offset-md-3 mt-3">
          {children}

          <SignedButton />
        </Col>
      </UnauthenticatedTemplate>
    </>
  );
}
