import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from '@azure/msal-react';
import Grid from '@mui/material/Grid';
import React from 'react';
import SignedButton from './SignedButton/SignedButton';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export default function PageLayout({ children }: IProps): React.ReactElement {
  return (
    <>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Grid container>
          <Grid item sm={12}>
            {children}

            <SignedButton />
          </Grid>
        </Grid>
      </UnauthenticatedTemplate>
    </>
  );
}
