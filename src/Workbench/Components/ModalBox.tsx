import { Box, styled } from '@mui/material/';

export const ModalBox = styled(Box)(() => ({
  marginTop: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  width: '30vw'
}));

export const ModalButtonsBox = styled(Box)(() => ({
  marginTop: 16,
  display: 'flex',
  flexDirection: 'row',
  marginLeft: 'auto'
}));
