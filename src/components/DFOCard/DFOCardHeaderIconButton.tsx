import { IconButton, styled } from '@mui/material/';

export const DFOCardHeaderIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'hoverColor'
})<{ hoverColor?: string }>(({ theme, hoverColor }) => ({
  display: 'flex',
  alignSelf: 'center',
  padding: 0,
  paddingRight: 8,
  width: 32,
  height: 32,
  '&:hover': {
    '& .MuiSvgIcon-root': {
      color: hoverColor ? hoverColor : theme.palette.dfoLightBlue.main
    }
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.dfoWhite.main,
    width: 32,
    height: 32
  }
}));
