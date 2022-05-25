import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';
import { Typography, Button } from '@mui/material/';
import React from 'react';
import { loginRequest } from '../../authentication/authConfig';
import { useTranslation } from 'react-i18next';
import { FlexColumnBox } from '../FlexBox/FlexColumnBox';
import { Flex100Box } from '../FlexBox/Flex100Box';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export default function AuthenticatedLayout({
  children
}: IProps): React.ReactElement {
  const { instance } = useMsal();
  const { t } = useTranslation();

  return (
    <Flex100Box>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <FlexColumnBox sx={{ paddingTop: 10, paddingLeft: '5%' }}>
          <Typography variant={'md'}>
            {t('Please sign-in to access this page')}
          </Typography>
          <Button
            variant="primary"
            sx={{ marginRight: 'auto', marginTop: 2 }}
            onClick={() => instance.loginPopup(loginRequest)}
          >
            {t('Sign in')}
          </Button>
        </FlexColumnBox>
      </UnauthenticatedTemplate>
    </Flex100Box>
  );
}
