import { IconButton, styled } from '@mui/material/';

export const FormIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'hoverColor',
})<{ hoverColor?: string }>(({ hoverColor }) => ({
  display: 'flex',
  alignSelf: 'center',
  padding: 0,
  paddingRight: 'var(--tiny-gap)',
  backgroundColor: 'transparent',
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'transparent',
    color: hoverColor ? hoverColor : 'var(--link-hover-color)',
  },
}));
