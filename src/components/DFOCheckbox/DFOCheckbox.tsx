import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/';
import theme from '../../theme';

export const DFOCheckbox = styled(Checkbox)(() => ({
  border: `0.1rem solid transparent`,
  backgroundColor: 'transparent',
  padding: 0,
  marginLeft: -5,

  '&:hover': {
    backgroundColor: 'transparent'
  },

  '& .MuiSvgIcon-root': {
    width: 32,
    height: 32,
    color: theme.palette.primary.main,
    backgroundColor: 'transparent'
  }
}));
