import { Box, styled } from '@mui/material';

export const FormBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: `var(--small-gap)`,
  backgroundColor: `var(--white-color)`,
  border: `0.2rem var(--primary-color) solid`,
  padding: `var(--normal-gap)`
}));

export const FormFieldsBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: `var(--small-gap)`
}));
