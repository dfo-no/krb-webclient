import { Box, styled } from '@mui/material';

export const FormDeleteBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.errorRed.main,
  border: `2px solid ${theme.palette.errorRed.main}`
}));
