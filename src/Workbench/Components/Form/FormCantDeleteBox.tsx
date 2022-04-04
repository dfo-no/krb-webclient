import { Box, styled } from '@mui/material';

export const FormCantDeleteBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.gray500.main,
  border: `2px solid ${theme.palette.gray400.main}`
}));
