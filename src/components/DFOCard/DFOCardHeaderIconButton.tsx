import { IconButton, styled } from '@mui/material/';

export const DFOCardHeaderIconButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  padding: 0,
  paddingRight: 8,
  width: 32,
  height: 32,
  '&:hover': {
    '& .MuiSvgIcon-root': {
      color: theme.palette.lightBlue.main
    }
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.white.main,
    width: 32,
    height: 32
  }
}));
