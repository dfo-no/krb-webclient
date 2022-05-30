import { Box, Button, styled } from '@mui/material/';

export const ModalBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 25,
  width: '35vw',
  alignSelf: 'center',
  justifySelf: 'center'
}));

export const ModalFieldsBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16
}));

export const ModalButtonsBox = styled(Box)(() => ({
  marginTop: 8,
  display: 'flex',
  gap: 5,
  flexDirection: 'row',
  marginLeft: 'auto'
}));

export const ModalButton = styled(Button)(() => ({
  height: 32
}));
