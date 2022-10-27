import { Box, styled } from '@mui/material/';

export const StandardContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 40,
  margin: '0 auto',
  width: '100%',
  maxWidth: 1350,
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 40,
}));
