import { Box, styled } from '@mui/material';

export const FormContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  border: `1px solid ${theme.palette.gray500.main}`,
  children: {
    alignSelf: 'center',
    width: '100%'
  },
  backgroundColor: theme.palette.dfoWhite.main
}));
