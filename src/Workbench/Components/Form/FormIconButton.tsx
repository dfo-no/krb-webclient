import { IconButton, styled } from '@mui/material/';

export const FormIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'hoverColor'
})<{ hoverColor?: string }>(({ theme, hoverColor }) => ({
  display: 'flex',
  alignSelf: 'center',
  padding: 0,
  paddingRight: 8,
  color: 'inherit',
  '&:hover': {
    color: hoverColor ? hoverColor : theme.palette.lightBlue.main
  }
}));
