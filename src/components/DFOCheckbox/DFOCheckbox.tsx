import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/';

type IProps = {
  _color?: string;
};

export const DFOCheckbox = styled(Checkbox)(({ _color }: IProps) => ({
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
    color: _color ? 'var(--text-primary-color)' : 'var(--primary-light-color)',
    backgroundColor: 'transparent',

    '&.Mui-checked': {
      '&, & + .MuiFormControlLabel-label': {
        color: _color,
      },
    },
  },
}));
