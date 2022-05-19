import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/';
import theme from '../../theme';

export const DFOCheckbox = styled(Checkbox)(() => ({
  border: `1px solid transparent`,
  '& .MuiSvgIcon-root': {
    width: 32,
    height: 32,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.white.main
  }
}));
