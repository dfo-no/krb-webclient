import { Box, styled } from '@mui/material';

export const FormItemBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.dfoWhite.main
}));
