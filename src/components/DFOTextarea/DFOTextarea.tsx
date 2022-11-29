import { Input, styled } from '@mui/material';

const DFOTextarea = styled(Input)(({ _color }: { _color?: string }) => ({
  width: '100%',
  border: `0.2rem solid ${_color ? _color : 'var(--primary-light-color)'}`,
  backgroundColor: `var(--white-color)`,
  paddingLeft: '1rem',
  paddingRight: '1rem',

  '&:hover': {
    border: `0.3rem solid ${_color ? _color : 'var(--primary-light-color)'}`,
  },
  '&.Mui-focused': {
    border: `0.3rem solid ${_color ? _color : 'var(--primary-light-color)'}`,
  },
  '&.Mui-error': {
    border: `0.2rem solid var`,
    '&:hover': {
      borderColor: `var(--error-color)`,
      borderWidth: 3,
    },
    '&.Mui-focused': {
      borderColor: `var(--error-color)`,
      borderWidth: 3,
    },
  },
}));

export default DFOTextarea;
