import { Box, styled } from '@mui/material';

export const FormContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.dfoWhite.main,
  border: `1px solid ${theme.palette.gray500.main}`,
  marginBottom: 16,
  padding: 32
}));
