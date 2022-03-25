import { Box, styled } from '@mui/material/';

export const ModalBox = styled(Box)(() => ({
  marginTop: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 32
}));

export const ModalButtonsBox = styled(Box)(() => ({
  marginTop: 16,
  display: 'flex',
  flexDirection: 'row',
  marginLeft: 'auto'
}));
