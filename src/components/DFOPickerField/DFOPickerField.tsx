import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const DFOPickerField = styled(TextField)(({ _color }: { _color?: string }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    height: 45,
    borderRadius: 0,
    '& fieldset': {
      border: `0.2rem solid ${_color ? _color : 'var(--primary-light-color)'}`,
    },
    '&.Mui-focused fieldset': {
      border: `0.3rem solid ${_color ? _color : 'var(--primary-light-color)'}`,
    },
    '&:hover fieldset': {
      border: `0.3rem solid ${_color ? _color : 'var(--primary-light-color)'}`,
    },
  },
}));

export default DFOPickerField;
