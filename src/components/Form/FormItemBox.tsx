import { Box, styled } from '@mui/material';

export const FormItemBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.white.main,
  flexDirection: 'column',
  paddingLeft: 8,
  paddingRight: 8,
  gap: 32,
}));
