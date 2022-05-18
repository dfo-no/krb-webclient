import { Button, styled } from '@mui/material/';

export const FormTextButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'hoverColor'
})<{ hoverColor?: string }>(({ theme, hoverColor }) => ({
  backgroundColor: theme.palette.white.main,
  cursor: 'pointer',
  marginTop: 'auto',
  padding: 0,
  marginBottom: 2,
  marginRight: 16,
  '&:hover': {
    background: hoverColor ? hoverColor : theme.palette.lightBlue.main
  }
}));
