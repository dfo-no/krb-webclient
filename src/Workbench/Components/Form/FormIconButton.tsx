import { IconButton, styled } from '@mui/material/';

export const FormIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'hoverColor'
})<{ hoverColor?: string }>(({ theme, hoverColor }) => ({
  display: 'flex',
  alignSelf: 'center',
  padding: 0,
  paddingRight: 8,
  width: 32,
  height: 32,
  color: theme.palette.gray500.main,
  '&:hover': {
    color: hoverColor ? hoverColor : theme.palette.dfoLightBlue.main
  },
  '& .MuiSvgIcon-root': {
    width: 32,
    height: 32
  }
}));
