import { Button, styled } from '@mui/material/';

export const FormTextButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'hoverColor'
})<{ hoverColor?: string }>(({ theme, hoverColor }) => ({
  backgroundColor: theme.palette.dfoWhite.main,
  cursor: 'pointer',
  marginTop: 'auto',
  padding: 0,
  marginBottom: 2,
  '&:hover': {
    background: hoverColor ? hoverColor : theme.palette.dfoLightBlue.main
  }
}));
