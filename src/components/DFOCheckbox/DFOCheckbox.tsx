import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/';

export const DFOCheckbox = styled(Checkbox)(() => ({
  border: `0.1rem solid transparent`,
  backgroundColor: 'transparent',
  padding: 0,
  marginLeft: '-0.5rem',

  '&:hover': {
    backgroundColor: 'transparent',
  },

  '& .MuiSvgIcon-root': {
    width: '3.2rem',
    height: '3.2rem',
    color: 'var(--primary-light-color)',
    backgroundColor: 'transparent',
  },
}));
