import { Box, styled } from '@mui/material/';

export const SearchContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  minHeight: 90,
  paddingBottom: 32,
}));

export const SearchFieldContainer = styled(Box)(() => ({
  width: '50%',
  alignSelf: 'center',
}));

export const NewButtonContainer = styled(Box)(() => ({
  marginLeft: 'auto',
  alignSelf: 'center',
}));
