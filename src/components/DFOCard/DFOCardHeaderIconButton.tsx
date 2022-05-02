import { IconButton, styled } from '@mui/material/';

export const DFOCardHeaderIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'hoverColor'
})<{ hoverColor?: string }>(({ theme, hoverColor }) => ({
  display: 'flex',
  alignSelf: 'center',
  padding: 0,
  paddingRight: 8,
  '&:hover': {
    '& .MuiSvgIcon-root': {
      color: hoverColor ? hoverColor : theme.palette.lightBlue.main
    }
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.white.main
  }
}));
