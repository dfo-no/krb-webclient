import { Box, styled } from '@mui/material';

export const FormContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.white.main,
  border: `0.1rem solid ${theme.palette.gray400.main}`,
  marginBottom: 16,
  padding: 32
}));
