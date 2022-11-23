import { Input } from '@mui/material';
import { styled } from '@mui/material/styles';

const DFOTextField = styled(Input)(({ _color }: { _color?: string }) => ({
  width: '100%',
  border: `0.2rem solid ${_color ? _color : 'var(--primary-light-color)'}`,
  backgroundColor: `var(--white--color)`,
  height: 45,
  paddingLeft: '1rem',

  '&:hover': {
    border: `0.3rem solid ${_color ? _color : 'var(--primary-light-color)'}`,
  },
  '&.Mui-focused': {
    border: `0.3rem solid ${_color ? _color : 'var(--primary-light-color)'}`,
  },
  '&.Mui-error': {
    border: `0.2rem solid var(--error-color)`,
    '&:hover': {
      border: '0.3rem solid var(--error-color)',
    },
    '&.Mui-focused': {
      border: '0.3rem solid var(--error-color)',
    },
  },
}));

export default DFOTextField;
