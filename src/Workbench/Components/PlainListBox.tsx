import { Box, styled } from '@mui/material/';

export const PlainListBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: 60,
  width: '100%',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 15,
  paddingRight: 15,
  marginBottom: 15,
  backgroundColor: theme.palette.gray100.main,
  border: `1px solid ${theme.palette.gray500.main}`
}));
